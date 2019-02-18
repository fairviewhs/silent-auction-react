# Frontend

## What is being used

We are using [reactjs](https://reactjs.org/) a popular frontend library to create the user interface.

We are also using [redux](https://redux.js.org/) in conjunction with [react-redux](https://react-redux.js.org/) to manage *state* more effectively.
For redux we have create some custom middleware to log users out on http errors (such as error 401, unauthorized).
We also have a middleware that automatically calls the backend and redux actions depending on the servers response. See more [here](src/redux-middleware/api/api.ts).

### Deployment

For deploying the frontend we used [surge.sh](https://surge.sh). Surge hosts static html files for free with a custom url (we have to pay for the custom url).
Surge also handles [caching](https://surge.sh/help/using-lucid-caching-automatically) and creates a cdn for us. This makes the site faster to load.

To deploy the app to surge run `npm run deploy`