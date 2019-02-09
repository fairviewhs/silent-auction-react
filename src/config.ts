import convict from 'convict';

const config = convict({
  port: {
    doc: 'The port for the express server to run on',
    format: 'port',
    default: 3001,
    env: 'PORT'
  },
  apiRoot: {
    doc: 'The root uri for the api',
    format: String,
    default: 'http://localhost:3001'
  },
  secrets: {
    mail: {
      user: {
        doc: 'The username for the gmail mail transport',
        format: String,
        default: 'silentauction'
      },
      pass: {
        doc: 'The password for the gmail mail transport',
        format: String,
        default: 'XXXXXXXXXXXX'
      }
    }
  }
});

config.validate({ allowed: 'strict' });

export default config;