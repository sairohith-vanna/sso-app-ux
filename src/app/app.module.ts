import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule, AuthConfig } from 'angular-oauth2-oidc';
import { AuthConfigService } from './services/auth-config.service';
import { oauthConfig } from './oauth-config';

export function init_app(authConfigService: AuthConfigService): any {
  return () => authConfigService.initAuth();
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
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:8081/secure'],
        sendAccessToken: true
      }
    })
  ],
  providers: [
    { provide: AuthConfig, useValue: oauthConfig },
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      multi: true,
      deps: [AuthConfigService]
    },
    AuthConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
