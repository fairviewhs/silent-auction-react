import * as LoginActionTypes from '../actiontypes/login';

function login(
  state = {
    token: localStorage.getItem('token'),
    isFetching: false
  },
  action: any
) {
  switch (action.type) {
    case LoginActionTypes.INVALIDATE_LOGIN:
      localStorage.removeItem('id');
      return {
        ...state,
        token: null
      };
    case LoginActionTypes.REQUEST_LOGIN:
      return {
        ...state,
        isFetching: true
      };
    case LoginActionTypes.RECEIVE_LOGIN:
      localStorage.setItem('token', action.response.access_token);
      return {
        ...state,
        isFetching: false,
        token: action.response.access_token
      };
    case LoginActionTypes.FAILURE_LOGIN:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
}

export default login;