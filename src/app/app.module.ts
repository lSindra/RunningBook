import {BrowserModule} from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import {MatExpansionModule} from '@angular/material/expansion';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatTabsModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatCheckboxModule,
  MatGridListModule
} from '@angular/material';

import { ROUTES } from './app.routes';
import { AppComponent } from './_components/app.component';
import { LoginComponent } from './_components/login/login.component';
import { HomeComponent } from './_components/home/home.component';
import { NotFoundComponent } from './_components/not-found/not-found.component';
import { UserService } from './_services/user.service';
import { ChallengeService } from './_services/challenge.service';
import { AppConfigService } from './config/app-config.service';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { AngularFireModule } from '@angular/fire';
import { AuthGuard } from './core/auth.guard';
import { ProfilePageComponent } from './_components/profile-page/profile-page.component';
import { ChallengePageComponent } from './_components/challenge-page/challenge-page.component';
import { RunComponent } from './_components/run/run.component';
import { FoodComponent } from './_components/food/food.component';
import { PilatesComponent } from './_components/pilates/pilates.component';
import { BntSaveComponent,MessageSave } from './_components/run/bnt-save/bnt-save.component';
import { BodybuildingComponent } from './_components/bodybuilding/bodybuilding.component';

export function initializeApp(appConfig: AppConfigService) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
  AppComponent,
  LoginComponent,
  HomeComponent,
  NotFoundComponent,  
  ProfilePageComponent,
  ChallengePageComponent,
  RunComponent,
  FoodComponent,
  PilatesComponent,
  BntSaveComponent,
  MessageSave,
  BodybuildingComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule,
    MatGridListModule,
    MatDialogModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatPasswordStrengthModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    MatExpansionModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    NgxAuthFirebaseUIModule.forRoot(environment.firebase),
  ],
  entryComponents:[
    MessageSave
  ],
  schemas: [ NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthGuard,
    UserService,
    ChallengeService,
    AppConfigService,
       { provide: APP_INITIALIZER,
         useFactory: initializeApp,
         deps: [AppConfigService], multi: true }
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
