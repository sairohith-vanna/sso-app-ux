import { KeycloakConfiguration } from './KeycloakConfiguration';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule, LogLevel, OidcConfigService } from 'angular-auth-oidc-client';

// tslint:disable-next-line: typedef
export function configureAuth(oidcConfigService: OidcConfigService) {
  return () =>
      oidcConfigService.withConfig({
          stsServer: 'https://ksso.aws.srrclouddev.xyz/auth',
          redirectUrl: 'http://localhost:4200',
          postLogoutRedirectUri: window.location.origin,
          clientId: 'demoapp-client',
          logLevel: LogLevel.Debug,
          authWellknownEndpoint: 'http://localhost:8081',
          responseType: 'code'
      });
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot()
  ],
  providers: [
    OidcConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: configureAuth,
            deps: [OidcConfigService],
            multi: true,
        }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
