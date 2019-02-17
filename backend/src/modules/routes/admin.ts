import express from 'express';
import validate from '../middleware/validate';
// import { registerUser, loginUser } from '../auth/auth';
import asyncMid from '../middleware/asyncMid';
import joi from 'joi';
import { User } from '../models/user';
import { loginAdmin } from '../auth/authAdmin';

const router = express.Router();

// TODO: extract
export const loginAdminDto = joi.object().keys({
  email: joi.string().required(),
  password: joi.string().required()
}).required();

router.post('/', validate(loginAdminDto), asyncMid(async (req, res) =>
  res.json(await loginAdmin(req.body))
));

export default router;