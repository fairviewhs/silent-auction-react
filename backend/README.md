# Backend

## What is being used

For the backend we are using [express](https://expressjs.com/) as the web framework.
It is simple to write in and it is very modular with many libraries.

User authentication is using [passport](http://www.passportjs.org/) with [passport-jwt](https://www.npmjs.com/package/passport-jwt) for simple stateless authentication.

### Deployment

https://github.com/heroku/heroku-builds

Make sure that all the environment variables are set before deploying the app to avoid crashes / using default config values.

To deploy the app to heroku run `npm run deploy`