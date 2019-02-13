import * as AdminActionTypes from '../actiontypes/admin';

function admin(
  state = {
    token: localStorage.getItem('admin'),
    isFetching: false
  },
  action: any
) {
  switch (action.type) {
    case AdminActionTypes.INVALIDATE_ADMIN_LOGIN:
      localStorage.removeItem('admin');
      return {
        ...state,
        token: null
      };
    case AdminActionTypes.REQUEST_ADMIN_LOGIN:
      return {
        ...state,
        isFetching: true
      }
    case AdminActionTypes.RECEIVE_ADMIN_LOGIN_SUCCESS:
      localStorage.setItem('admin', action.response.access_token);
      return {
        ...state,
        token: action.response.access_token,
        isFetching: false
      }
    case AdminActionTypes.REQUEST_ADMIN_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state;
  }
}

export default admin;