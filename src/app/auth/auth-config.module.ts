import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
  imports: [AuthModule.forRoot({
    config: {
      authority: 'https://login.microsoftonline.com/402e6795-2c27-4390-a056-18eeea28103c/v2.0',
      authWellknownEndpointUrl: 'https://login.microsoftonline.com/402e6795-2c27-4390-a056-18eeea28103c/v2.0',
      redirectUrl: window.location.origin,
      clientId: '54d3cbe5-aea3-4623-93b6-7ee609fa0611',
      scope: 'openid profile api://dmt/warehouse.read', // 'openid profile offline_access ' + your scopes
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      maxIdTokenIatOffsetAllowedInSeconds: 600,
      issValidationOff: false,
      autoUserInfo: false,
      customParamsAuthRequest: {
        prompt: 'select_account', // login, consent
      },
    }
  })],
  exports: [AuthModule],
})
export class AuthConfigModule { }
