import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfigService } from '../config/app-config.service';
import { RelationshipModel } from '../_models/relationship-model';
import { AuthService } from '../core/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

enum Types {
  Request = 'request',
  Friend = 'friend',
  Block = 'block',
}

@Injectable()
export class FriendsService {
  constructor(private http: HttpClient, public auth: AngularFireAuth) {}
  private apiServer = AppConfigService.settings.apiServer.metadata;
  private url = this.apiServer + 'friendsAPI/';

  getMyFriends(uid: string): Observable<RelationshipModel[]> {
    return this.http.get<RelationshipModel[]>(this.url + this.auth.auth.currentUser.uid);
  }

  getMyFriendsByType(type: string): Observable<RelationshipModel[]> {
    return this.http.get<RelationshipModel[]>(this.url + this.auth.auth.currentUser.uid + '/' + type);
  }

  getRelationshipByRelatedUID(relatedUID: string): Observable<RelationshipModel> {
    return this.getRelationshipByBothUID(this.auth.auth.currentUser.uid, relatedUID);
  }

  getRelationshipByBothUID(relatingUID: string, relatedUID: string): Observable<RelationshipModel> {
    return this.http.get<RelationshipModel>(this.url + relatingUID + '/' + relatedUID);
  }

  updateOrCreateRelationshipByBothUID(relatingUID: string, relatedUID: string, type: string) {
    return this.http.post<RelationshipModel>(this.url + relatingUID + '/' + relatedUID, type, httpOptions)
      .subscribe(
        data => {
            console.log('POST Request is successful ', data);
        },
        error => {
            console.log('Error', error);
        }
    );
  }

  addFriend(relatedUID: string) {
    const type = Types.Request;
    this.updateOrCreateRelationshipByBothUID(this.auth.auth.currentUser.uid, relatedUID, type);
  }
}
