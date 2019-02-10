import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import config from '../../config';
import { User } from '../models/user';

export const findUser = async (jwtPayload: any) => {
  const user = await User.findById({ _id: jwtPayload.id }).exec();
  if (!!user) {
    return user;
  }
  return false;
}

export const errorCatcher = (asyncFn: (payload: any) => Promise<any>) => (jwtPayload: any, done: VerifiedCallback) =>
  asyncFn(jwtPayload)
    .then((authenticated: any) => done(null, authenticated))
    .catch((error: any) => done(error, false));

const generateJwtStrategy = () => {
  const options = {
    secretOrKey: config.get('jwt.secret'),
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };
  return new JwtStrategy(options, errorCatcher(findUser));
}

export default generateJwtStrategy;