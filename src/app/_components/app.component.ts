import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth.service';
import { User } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router) {}

  title = 'RunningBook';
  user: User;

  isLoggedIn() {
    this.user = this.auth.getCurrentUser();
    return this.auth.isLoggedIn();
  }

  signOut() {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }
}
