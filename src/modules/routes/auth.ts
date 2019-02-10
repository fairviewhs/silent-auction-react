import express from 'express';
import validate from '../middleware/validate';
import { registerUser, loginUser } from '../auth/auth';
import asyncMid from '../middleware/asyncMid';
import joi from 'joi';

const router = express.Router();

// TODO: extract
export const loginDto = joi.object().keys({
  email: joi.string().required(),
  password: joi.string().required()
}).required();

export const registerDto = joi.object().keys({
  name: joi.string().required().trim(),
  email: joi.string().required().email(),
  phone: joi.string().required().length(10),
  address: joi.string().min(2),
  password: joi.string().required().min(4).max(60)
}).required();

router.post('/register', validate(registerDto), asyncMid(async (req, res) =>
  res.json(await registerUser(req.body))
));

router.post('/login', validate(loginDto), asyncMid(async (req, res) =>
  res.json(await loginUser(req.body))
));

export default router;