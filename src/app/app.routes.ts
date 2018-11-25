import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './_components/login/login.component';
import { HomeComponent } from './_components/home/home.component';
import { NotFoundComponent } from './_components/not-found/not-found.component';
import { AuthGuard } from './core/auth.guard';
import { ProfilePageComponent } from './_components/profile-page/profile-page.component';
import { ChallengePageComponent } from './_components/challenge-page/challenge-page.component';
import {RunComponent} from '../app/_components/run/run.component';
import {FoodComponent} from '../app/_components/food/food.component';
import {PilatesComponent} from '../app/_components/pilates/pilates.component';
import { NgModule } from '@angular/core';
import {BodybuildingComponent} from './_components/bodybuilding/bodybuilding.component';
export const ROUTES: Routes = [
  { path: '',         component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile',  component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'challenges',  component: ChallengePageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  //{ path: '**', component: NotFoundComponent }, Desativado porque não estava encontrando as páginas dos desafios
  { path: 'bodybuilding', component: BodybuildingComponent},
  { path: 'run',component: RunComponent},
  { path: 'food', component:FoodComponent },
  { path: 'pilates', component:PilatesComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

