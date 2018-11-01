import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfigService } from '../config/app-config.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { NotificationModel } from '../_models/notification-model';

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable()
export class NotificationsService {
  constructor(private http: HttpClient, public auth: AngularFireAuth) {}
  private apiServer = AppConfigService.settings.apiServer.metadata;
  private url = this.apiServer + 'notificationsAPI/';

  getMyNotifications(): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(this.url + this.auth.auth.currentUser.uid);
  }

  sendNotificationToUser(notification: NotificationModel) {
    return this.http.post(this.url, notification, httpOptions)
      .subscribe(
        data => {
          console.log('Sending notification');
        },
        error => {
          console.log('Error', error);
        }
    );
  }

  dismisNotificationByUID(notificationID: string) {
    return this.http.delete(this.url + notificationID)
      .subscribe(
        data => {
          console.log('Deleting notification');
        },
        error => {
          console.log('Error', error);
        }
    );
  }
}
