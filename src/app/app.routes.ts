import { Routes } from '@angular/router';

import { LoginComponent } from './_components/login/login.component';
import { HomeComponent } from './_components/home/home.component';
import { NotFoundComponent } from './_components/not-found/not-found.component';
import { AuthGuard } from './core/auth.guard';
import { ProfilePageComponent } from './_components/profile-page/profile-page.component';
import { ChallengePageComponent } from './_components/challenge-page/challenge-page.component';
import {RunComponent} from './_components/run/run.component';
import {FoodComponent} from './_components/food/food.component';
import {BodybuildingComponent} from './_components/bodybuilding/bodybuilding.component'
import {PilatesComponent} from './_components/pilates/pilates.component';
export const ROUTES: Routes = [
  { path: '',           component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile',    component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'challenges', component: ChallengePageComponent, canActivate: [AuthGuard] },
  { path: 'login',      component: LoginComponent },
 // { path: '**',         component: NotFoundComponent, canActivate: [AuthGuard] },
  { path: 'run', component: RunComponent },
  { path: 'food', component:FoodComponent},
  { path: 'bodybuilding', component:BodybuildingComponent},
  { path: 'pilates',component:PilatesComponent}
];
