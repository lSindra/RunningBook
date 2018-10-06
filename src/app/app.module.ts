import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserService } from './_services/user.service';
import { AppConfigService } from './config/app-config.service';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { AngularFireModule } from '@angular/fire';
import { AuthGuard } from './core/auth.guard';

export function initializeApp(appConfig: AppConfigService) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
  AppComponent,
  LoginComponent,
  HomeComponent,
  NotFoundComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    BrowserAnimationsModule,
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    NgxAuthFirebaseUIModule.forRoot(environment.firebase),
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    AuthGuard,
    UserService,
    AppConfigService,
       { provide: APP_INITIALIZER,
         useFactory: initializeApp,
         deps: [AppConfigService], multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
