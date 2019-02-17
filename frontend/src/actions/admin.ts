import { CALL_API } from '../redux-middleware/api/api';
import * as AdminActionTypes from '../actiontypes/admin';

export const loginAdmin = (email: string, password: string) => ({
  [CALL_API]: {
    types: [
      AdminActionTypes.REQUEST_ADMIN_LOGIN,
      AdminActionTypes.RECEIVE_ADMIN_LOGIN_SUCCESS,
      AdminActionTypes.REQUEST_ADMIN_LOGIN_FAILURE
    ],
    method: 'POST',
    endpoint: '/admin',
    data: {
      email,
      password
    },
    minimumDelay: 1000
  }
});

export const logoutAdmin = () => ({
  type: AdminActionTypes.INVALIDATE_ADMIN_LOGIN
});