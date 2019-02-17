import * as LoginActionTypes from '../actiontypes/login';
import { CALL_API } from '../redux-middleware/api/api';

export const login = (name: string, email: string, phone: string) => ({
  [CALL_API]: {
    types: [
      LoginActionTypes.REQUEST_LOGIN,
      LoginActionTypes.RECEIVE_LOGIN,
      LoginActionTypes.FAILURE_LOGIN
    ],
    endpoint: '/user/register', // TODO: change backend to login
    method: 'POST',
    data: {
      name,
      email,
      phone
    },
    minimumDelay: 1000
  }
});

export const logout = () => ({
  type: LoginActionTypes.INVALIDATE_LOGIN
});