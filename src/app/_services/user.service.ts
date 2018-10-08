import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RunningUserModel } from '../_models/user-model';

import { AppConfigService } from '../config/app-config.service';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  private apiServer = AppConfigService.settings.apiServer.metadata;
  
  updateUser(User: RunningUserModel): Observable<void> {
    const url = this.apiServer + 'users/';
    return this.http.put<void>(url + User.username, User);
  }
}