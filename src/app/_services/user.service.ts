import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../_models/user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3002/api/Users');
  }

  getUserByUserName(username: string): Observable<User> {
    return this.http.get<User>('http://localhost:3002/api/Users/' + username);
  }

  registerUser(User: User): Observable<User> {
    return this.http.post<User>('http://localhost:3002/api/Users/', User);
  }
  
  updateUser(User: User): Observable<void> {
    return this.http.put<void>('http://localhost:3002/api/Users/' + User.username, User);
  }

  deleteUser(name: string) {
    return this.http.delete('http://localhost:3002/api/Users/' + name);
  }
}