import { environment } from './../environments/environment';
import { KeycloakService } from 'keycloak-angular';

export class KeycloakConfiguration {

  constructor() {}

  public static initializeKeycloak(keycloak: KeycloakService): any {
    return  () =>
      keycloak.init({
        config: {
          url: environment.keycloakConfiguration.url,
          clientId: environment.keycloakConfiguration.clientId,
          realm: environment.keycloakConfiguration.realm
        },
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: true
        },
        bearerExcludedUrls: []
      });
  }
}
