import convict from 'convict';

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  admin: {
    email: {
      doc: 'The admin email to be generated',
      format: String,
      default: 'webteam@fairviewhs.org',
      env: 'ADMIN_EMAIL',
      sensitive: true
    },
    password: {
      doc: 'The admin password to be generated',
      format: String,
      default: 'password',
      env: 'ADMIN_PASSWORD',
      sensitive: true
    }
  },
  mongodb: {
    doc: 'The uri to the mongo database',
    format: String,
    default: 'mongodb://localhost:27017/silent-auction',
    env: 'MONGODB_URI',
    sensitive: true
  },
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
    },
    expireIn: {
      doc: 'How long the jwt token lasts',
      format: String,
      default: '24h',
      env: 'JWT_TIME'
    }
  }
});

config.validate({ allowed: 'strict' });

export default config;