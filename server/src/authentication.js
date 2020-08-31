const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');

module.exports = function (app) {
  class MyAuthService extends AuthenticationService {
    async getPayload(authResult, params) {
      const payload = await super.getPayload(authResult, params);
      const { user } = authResult;
  
      return Object.assign(payload, { 'user': user });
    }
  }
  
  const authentication = new MyAuthService(app);

  // Set up authentication with the secret
  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());

  app.use('/authentication', authentication);
};
