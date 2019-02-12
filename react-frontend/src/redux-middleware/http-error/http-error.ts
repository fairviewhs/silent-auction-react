export const HTTP_ERROR = 'HTTP_ERROR';

// If http error, this finds the thunk for that specific error and calls it with next (dispatch)
// Used for 401 (Forbidden) where user if forced logged out
// TODO: better types
export default (thunksForErrors: any) => () => (next: any) => (action: any) => {
  const httpError = action[HTTP_ERROR];

  if (typeof httpError === 'undefined') {
    return next(action);
  }

  const thunk = thunksForErrors.find((thunk: any) => thunk.statusCode === httpError.statusCode);

  if (thunk) {
    thunk.action(next);
  }

  const finalAction = { ...action };
  delete finalAction[HTTP_ERROR];

  return next(finalAction);
};