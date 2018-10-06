import { Component, OnInit } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from './core/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router) {}

  title = 'RunningBook';
  user: Observable<firebase.User | null>;
 
  signOut() {
    console.log("logout");
    this.auth.signOut();
  }
  isLoggedIn() {
    return this.auth.isLoggedIn();
  }
}
