const axios = require('axios');
const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth, OAuthStrategy } = require('@feathersjs/authentication-oauth');

class GitHubStrategy extends OAuthStrategy {
  async getEntityData(profile) {
    const baseData = await super.getEntityData(profile);
    return {
      ...baseData,
      name: profile.login, // Can also be set to profile.name
      avatar: profile.avatar_url,
      email: profile.email
    };
  }
}

class GoogleStrategy extends OAuthStrategy {
    async getEntityData(profile) {
        const baseData = await super.getEntityData(profile);
        return {
            ...baseData,
            avatar: profile.picture,
            email: profile.email,
        };
    }
}

class FacebookStrategy extends OAuthStrategy {

    async getProfile (authResult) {
        // This is the oAuth access token that can be used
        // for Facebook API requests as the Bearer token
        const accessToken = authResult.access_token;
        const { data } = await axios.get('https://graph.facebook.com/me', {
            headers: {
                authorization: `Bearer ${accessToken}`
            },
            params: {
                // There are 
                fields: 'id,name,email,picture'
            }
        });
        return data;
    }

    async getEntityData(profile) {
        const baseData = await super.getEntityData(profile);
        return {
            ...baseData,
            name: profile.name,
            email: profile.email,
            avatar: profile.picture.data.url
        };
    }
}

module.exports = app => {
  const authentication = new AuthenticationService(app);
  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('github', new GitHubStrategy());
  authentication.register('facebook', new FacebookStrategy());
  authentication.register('google', new GoogleStrategy());
  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
