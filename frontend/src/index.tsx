import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers'
import api from './redux-middleware/api/api';
import httpError from './redux-middleware/http-error/http-error';
import { composeWithDevTools } from "redux-devtools-extension";
import { logout } from './actions/login';

const getAuthFromState = (state: any) => {
  if (!!state.admin.token) {
    return state.admin.token;
  }
  return state.login.token;
}

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(
      // thunk,
      api({
        getAuthFromState
      }),
      httpError([
        {
          statusCode: 401,
          action: logout
        }
      ])
    )
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
