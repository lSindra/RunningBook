import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../_models/user';
import { AppConfigService } from '../config/app-config.service';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  private apiServer = AppConfigService.settings.apiServer.metadata;

  getAllUsers(): Observable<User[]> {
    const url = this.apiServer + '/Users/';
    return this.http.get<User[]>(url);
  }

  getUserByUserName(username: string): Observable<User> {
    const url = this.apiServer + '/Users/';
    return this.http.get<User>(url + username);
  }

  registerUser(User: User): Observable<User> {
    const url = this.apiServer + '/Users/';
    return this.http.post<User>(url, User);
  }
  
  updateUser(User: User): Observable<void> {
    const url = this.apiServer + '/Users/';
    return this.http.put<void>(url + User.username, User);
  }

  deleteUser(name: string) {
    const url = this.apiServer + '/Users/';
    return this.http.delete(url + name);
  }
}