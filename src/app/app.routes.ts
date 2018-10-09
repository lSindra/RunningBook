import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './core/auth.guard';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ChallengePageComponent } from './challenge-page/challenge-page.component';

export const ROUTES: Routes = [
  { path: '',         component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile',  component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'challenges',  component: ChallengePageComponent, canActivate: [AuthGuard] },
  { path: 'login',    component: LoginComponent },
  { path: '**',       component: NotFoundComponent }
];
