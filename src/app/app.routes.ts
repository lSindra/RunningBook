import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './core/auth.guard';

export const ROUTES: Routes = [
  { path: '',         component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login',    component: LoginComponent },
  { path: '**',       component: NotFoundComponent }
];
