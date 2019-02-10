import express, { Request, Response } from 'express';
import joi from 'joi';
import validate from '../middleware/validate';
import asyncMid from '../middleware/asyncMid';
import { User } from '../models/user';
import findOrCreate from '../helper/findOrCreate';
import { Donation } from '../models/donation';
import { Auction } from '../models/auction';
import boom = require('boom');

const router = express.Router();

const dto = joi.object({
  email: joi.string().required(),
  amount: joi.number().required(),
  name: joi.string().required(),
  phone: joi.string().required()
}).required()

router.post('/:auctionId', validate(dto), asyncMid(async (req, res) => {
  if (req.body.amount < 0) {
    throw boom.badRequest('Amount must be more than zero!');
  }

  const user = await User.findOne({
    email: req.body.email,
    name: req.body.name
  }).exec();

  if (!user) throw boom.badRequest(`User does not exist`);

  const donation = await Donation.create({ amount: req.body.amount });
  await user.update({ $push: { donations: donation._id } }).exec();

  const auction = await Auction.findById(req.params.auctionId).exec();

  if (!auction) throw boom.badRequest(`Auction id ${req.params.auctionId} does not exist`);
  
  await auction.update({ $push: { donations: donation._id } }).exec();

  res.json({
    success: true
  });
}));

router.delete('/:id', asyncMid(async (req, res) => {
  Donation.updateOne()
}))

export default router;