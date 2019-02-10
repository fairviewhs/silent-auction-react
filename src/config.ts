import convict from 'convict';

const config = convict({
  port: {
    doc: 'The port for the express server to run on',
    format: 'port',
    default: 3001,
    env: 'PORT'
  },
  jwt: {
    secret: {
      doc: 'The jwt token secret for authenticating users',
      format: String,
      default: 'jwt_token_secret',
      env: 'JWT_SECRET'
    }
  }
});

config.validate({ allowed: 'strict' });

export default config;