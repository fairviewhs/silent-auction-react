import boom from 'boom';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { User, IUser } from '../models/user';

export const registerUser = async (userDetails: IUser) => {
  const { name, email, phone } = userDetails;
  const user = await User.findOne({ email }).exec();

  if (!!user) {
    throw boom.badRequest('Email already taken');
  }

  await User.create({
    name,
    email,
    phone
  })

  return {
    success: true,
    message: 'Successfully registered'
  };
}

export const loginUser = async (userDetails: IUser) => {
  const { email } = userDetails;

  const user = await User.findOne({ email }).exec();
  
  if (
    !!user
  ) {
    return {
      access_token: jwt.sign({ id: user._id }, config.get('jwt.secret'), { expiresIn: config.get('jwt.expireIn') })
    };
  }
  throw boom.badRequest('Username/password do not match');
}