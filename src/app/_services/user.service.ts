import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RunningUserModel } from '../_models/user-model';

import { AppConfigService } from '../config/app-config.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    //'Authorization': 'secret-key'
  })
 };
 
@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  private apiServer = AppConfigService.settings.apiServer.metadata;
  
  getUserByUID(uid: string): Observable<RunningUserModel> {
    const url = this.apiServer + 'userAPI/';
    return this.http.get<RunningUserModel>(url + uid);
  }

  updateUser(user: RunningUserModel) {
    const url = this.apiServer + 'userAPI/';
    return this.http.post<RunningUserModel>(url, user, httpOptions)
    .subscribe(
      data => {
          console.log("POST Request is successful ", data);
      },
      error => {
          console.log("Error", error);
      }
  );
  }
}