import { Component, OnInit, Inject } from '@angular/core';

import myAppConfig from '../config/my-app.config';
import * as OktaSignIn from '@okta/okta-signin-widget';

import { OktaAuthService } from '@okta/okta-angular';

const DEFAULT_ORIGINAL_URI = window.location.origin;

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent implements OnInit {
  oktaSignIn: any;

  constructor(private oktaAuthService: OktaAuthService) {
    this.oktaSignIn = new OktaSignIn({
      logo: 'assets/logo192.png',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.cliendId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes,
      },
    });
  }

  ngOnInit(): void {
    this.oktaSignIn.renderEl(
      {
        el: '#sign-in-widget',
        scopes: myAppConfig.oidc.scopes,
      },
      (res: any) => {
        if (res.status === 'SUCCESS') {
          //this.oktaAuthService.signInWithRedirect();
          console.log('Hello');
        }
      },
      (error: any) => {
        throw error;
      }
    );

    // this.oktaSignIn
    //   .showSignInToGetTokens({
    //     el: '#sign-in-widget',
    //     scopes: myAppConfig.oidc.scopes,
    //   })
    //   .then((tokens: Tokens) => {
    //     this.oktaSignIn.remove();

    //     this.oktaAuth.handleLoginRedirect(tokens);
    //   })
    //   .catch((err: any) => {
    //     throw err;
    //   });
  }
}
