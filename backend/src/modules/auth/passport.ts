import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import config from '../../config';
import { User } from '../models/user';
import { Admin } from '../models/admin';

export const findUser = async (jwtPayload: any) => {
  const user = await User.findById({ _id: jwtPayload.id }).exec();
  if (!!user) {
    return user;
  }
  return false;
}

export const findAdmin = async (jwtPayload: any) => {
  const user = await Admin.findById({ _id: jwtPayload.id }).exec();
  if (!!user) {
    return user;
  }
  return false;
}

export const errorCatcher = (asyncFn: (payload: any) => Promise<any>) => (jwtPayload: any, done: VerifiedCallback) =>
  asyncFn(jwtPayload)
    .then((authenticated: any) => done(null, authenticated))
    .catch((error: any) => done(error, false));

const generateJwtStrategy = (appendDetails: any) => () => {
  const options = {
    secretOrKey: config.get('jwt.secret'),
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };
  return new JwtStrategy(options, appendDetails);
}

export const user = generateJwtStrategy(errorCatcher(findUser));
export const admin = generateJwtStrategy(errorCatcher(findAdmin));