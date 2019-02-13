import passport from 'passport';
export default (type = 'user') => passport.authenticate(type, { session: false });