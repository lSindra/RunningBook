import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfigService } from '../config/app-config.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { NotificationModel } from '../_models/notification-model';

@Injectable()
export class NotificationsService {
  constructor(private http: HttpClient, public auth: AngularFireAuth) {}
  private apiServer = AppConfigService.settings.apiServer.metadata;
  private url = this.apiServer + 'notificationsAPI/';

  getMyNotifications(): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(this.url + this.auth.auth.currentUser.uid);
  }
}
