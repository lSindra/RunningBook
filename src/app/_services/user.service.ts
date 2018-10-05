import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserModel } from '../_models/user-model';
import { UserData } from '../_data/user-data';

import { AppConfigService } from '../config/app-config.service';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  private apiServer = AppConfigService.settings.apiServer.metadata;

  getAllUsers(): Observable<UserData[]> {
    const url = this.apiServer + '/users/';
    return this.http.get<UserModel[]>(url);
  }

  getUserByUserName(username: string): Observable<UserData> {
    const url = this.apiServer + '/users/';
    return this.http.get<UserData>(url + username);
  }

  registerUser(User: UserModel): Observable<UserModel> {
    const url = this.apiServer + '/users/';
    return this.http.post<UserModel>(url, User);
  }
  
  updateUser(User: UserModel): Observable<void> {
    const url = this.apiServer + '/users/';
    return this.http.put<void>(url + User.username, User);
  }

  deleteUser(name: string, password: string) {
    const url = this.apiServer + '/users/';
    return this.http.delete(url + name);
  }
}