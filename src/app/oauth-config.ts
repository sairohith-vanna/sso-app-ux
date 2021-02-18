import { environment } from './../environments/environment';
import { AuthConfig } from 'angular-oauth2-oidc';

// tslint:disable-next-line: one-variable-per-declaration
export const oauthConfig: AuthConfig = {

  issuer: environment.oidcConfiguration.issuer,
  redirectUri: environment.oidcConfiguration.redirectUri,
  clientId: environment.oidcConfiguration.clientId,
  responseType: environment.oidcConfiguration.responseType,
  scope: environment.oidcConfiguration.scope,
  showDebugInformation: environment.oidcConfiguration.showDebugInformation,
  strictDiscoveryDocumentValidation: environment.oidcConfiguration.strictDiscoveryDocumentValidation,
  requireHttps: false,
  skipIssuerCheck: true
};
