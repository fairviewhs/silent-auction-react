import boom from 'boom';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { IAdmin, Admin } from '../models/admin';
import bcrypt from 'bcryptjs';

// export const registerUser = async (userDetails: IAdmin) => {
//   const { email, password } = userDetails;
//   const user = await Admin.findOne({ email }).exec();

//   if (!!user) {
//     throw boom.badRequest('Email already taken');
//   }

//   await Admin.create({
//     email,
//     password
//   })

//   return {
//     success: true,
//     message: 'Successfully registered'
//   };
// }

export const loginAdmin = async (userDetails: IAdmin) => {
  const { email, password } = userDetails;

  const user = await Admin.findOne({ email }).exec();
  
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