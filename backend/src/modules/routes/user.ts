import express from 'express';
import validate from '../middleware/validate';
import { registerUser, loginUser } from '../auth/auth';
import asyncMid from '../middleware/asyncMid';
import joi from 'joi';
import { User } from '../models/user';

const router = express.Router();

// TODO: extract
export const loginDto = joi.object().keys({
  email: joi.string().required()
}).required();

export const registerDto = joi.object().keys({
  name: joi.string().required().trim(),
  email: joi.string().required().email(),
  phone: joi.string().required().length(10)
}).required();

router.post('/register', validate(registerDto), asyncMid(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).exec();
  console.log(await User.find().exec());
  if (!user) {
    return res.json(await registerUser(req.body));
  }
  res.json(await loginUser(req.body));
}));

router.post('/login', validate(loginDto), asyncMid(async (req, res) =>
  res.json(await loginUser(req.body))
));

export default router;