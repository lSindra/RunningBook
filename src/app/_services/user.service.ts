import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RunningUserModel } from '../_models/user-model';
import { AppConfigService } from '../config/app-config.service';

const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};
 
@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  private apiServer = AppConfigService.settings.apiServer.metadata;
  private url = this.apiServer + 'userAPI/';
  
  getUserByUID(uid: string): Observable<RunningUserModel> {
    return this.http.get<RunningUserModel>(this.url + uid);
  }

  getUsersByFilter(filter: string): Observable<RunningUserModel[]> {
    return this.http.get<RunningUserModel[]>(this.url + 'search/' + filter);
  }

  updateUser(user: RunningUserModel) {
    return this.http.post<RunningUserModel>(this.url, user, httpOptions)
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