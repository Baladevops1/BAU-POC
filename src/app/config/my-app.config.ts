export default {
  oidc: {
    cliendId: '0oahddfs3eWYS2H1W357',
    issuer: 'https://dfs-nonprod.okta.com/oauth2/default',
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email'],
  },
  widget: {
    useInteractionCodeFlow: true,
  },
};
