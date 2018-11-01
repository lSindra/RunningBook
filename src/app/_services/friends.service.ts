import { NotificationsService } from './notifications.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfigService } from '../config/app-config.service';
import { RelationshipModel } from '../_models/relationship-model';
import { AngularFireAuth } from '@angular/fire/auth';
import { NotificationModel } from '../_models/notification-model';

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

enum Types {
  Request = 'request',
  Friend = 'friend',
  Block = 'block',
}

@Injectable()
export class FriendsService {
  constructor(private http: HttpClient, public auth: AngularFireAuth, private notificationService: NotificationsService) {}
  private apiServer = AppConfigService.settings.apiServer.metadata;
  private url = this.apiServer + 'friendsAPI/';

  getMyRelations(): Observable<RelationshipModel[]> {
    return this.http.get<RelationshipModel[]>(this.url + 'my-relations/' + this.auth.auth.currentUser.uid);
  }

  getMyRelationsByType(type: string): Observable<RelationshipModel[]> {
    return this.http.get<RelationshipModel[]>(this.url + 'my-relations-with-type/' + this.auth.auth.currentUser.uid + ',' + type);
  }

  getRelationshipByRelatedUID(relatedUID: string): Observable<RelationshipModel> {
    return this.getRelationshipByBothUID(this.auth.auth.currentUser.uid, relatedUID);
  }

  getRelationshipByBothUID(relatingUID: string, relatedUID: string): Observable<RelationshipModel> {
    return this.http.get<RelationshipModel>(this.url + relatingUID + ',' + relatedUID);
  }

  addFriend(relatedUID: string) {
    const type = Types.Request;
    this.updateOrCreateRelationshipByBothUID(this.auth.auth.currentUser.uid, relatedUID, type);
  }

  updateOrCreateRelationshipByBothUID(relatingUID: string, relatedUID: string, type: string) {
    const relationship = new RelationshipModel;
    relationship.relationUser = relatingUID;
    relationship.relatedUser = relatedUID;
    relationship.type = type;

    return this.http.post(this.url, relationship, httpOptions)
      .subscribe(
        data => {
          if (relationship.type === Types.Friend || relationship.type === Types.Request) {
            this.acceptUserRequest(relatedUID, relatingUID);
          }
        },
        error => {
            console.log('Error', error);
        }
    );
  }

  private acceptUserRequest(relatedUID: string, relatingUID: string) {
    let related = false;
    this.getRelationshipByBothUID(relatedUID, relatingUID).subscribe(relatedUserRelationship => {
      related = true;
      if (relatedUserRelationship.type === 'request') {
        this.updateOrCreateRelationshipByBothUID(relatedUserRelationship.relationUser, relatedUserRelationship.relatedUser, Types.Friend);
        this.sendAcceptedUserRequestNotification(relatedUID, relatingUID);
      }
    }, () => {
      if (!related) {
        this.sendUserRequestNotification(relatedUID, relatingUID);
      }
    });
  }

  sendUserRequestNotification(relatedUID: string, relatingUID: string) {
    const notification = new NotificationModel();
    notification.type = 'friend-request';
    notification.image = 'user.image';
    notification.title = 'User sent you a friend request';
    notification.body = 'User sent you a friend request';
    notification.userID = relatedUID;
    notification.sender = relatingUID;

    this.notificationService.sendNotificationToUser(notification);
  }

  sendAcceptedUserRequestNotification(relatedUID: string, relatingUID: string) {
    const notification = new NotificationModel();
    notification.type = 'accepted';
    notification.image = 'user.image';
    notification.title = 'User is now your friend';
    notification.body = 'User is now your friend';
    notification.userID = relatedUID;
    notification.sender = relatingUID;

    this.notificationService.sendNotificationToUser(notification);
  }

}
