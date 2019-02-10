import boom from 'boom';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { User, IUser } from '../models/user';
import bcrypt from 'bcryptjs';

export const registerUser = async (userDetails: IUser) => {
  const { name, email, phone, address, password } = userDetails;
  const user = await User.findOne({ email }).exec();

  if (!!user) {
    throw boom.badRequest('Email already taken');
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  await User.create({
    name,
    email,
    phone,
    address,
    password: hashedPassword
  })

  return {
    success: true,
    message: 'Successfully registered'
  };
}

export const loginUser = async (userDetails: IUser) => {
  const { email, password } = userDetails;

  const user = await User.findOne({ email }).exec();
  
  if (
    !!user &&
    await bcrypt.compare(password, user.password)
  ) {
    return {
      access_token: jwt.sign({ id: user._id }, config.get('jwt.secret'), { expiresIn: config.get('jwt.expireIn') })
    };
  }
  throw boom.badRequest('Username/password do not match');
}