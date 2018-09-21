import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const ROUTES: Routes = [
  { path: '',         component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login',    component: LoginComponent },
  { path: '**',       component: NotFoundComponent }
];
