import express, { Request, Response } from 'express';
import joi, { raw } from 'joi';
import validate from '../middleware/validate';
import asyncMid from '../middleware/asyncMid';
import { User } from '../models/user';
import { Auction } from '../models/auction';
import boom = require('boom');
import { Bid } from '../models/bid';
import { Sponsor } from '../models/sponsor';
import authenticated from '../middleware/authenticated';

const router = express.Router();

const dto = joi.object({
  name: joi.string().required(),
  start_price: joi.number().required(),
  description: joi.string().required(),
  start_time: joi.date().required(),
  end_time: joi.date().required()
}).required()

router.get('/', asyncMid(async (req, res) => {
  const rawAuctions = await Auction.find().exec();
  const auctions = await Promise.all(rawAuctions.map(async (auction) => {
    const highestBids = await Bid.find({ auction: auction._id }).sort({ amount: -1 }).limit(1).exec();
    let highestPrice = auction.start_price;
    let highestBidder = null;
    if (highestBids.length > 0) {
      highestPrice = highestBids[0].amount;
      highestBidder = await User.findOne(highestBids[0].user as any).exec();
    }
    const sponsors = await Sponsor.find({auctions: auction._id}).exec();
    return {
      ...auction.toObject(),
      highestPrice,
      sponsors,
      highestBidder
    }
  })); 
  res.json(auctions);
}))

router.get('/:id', asyncMid(async (req, res) => {
    const id = req.params.id;
    const auction = await Auction.findOne({_id: id}).exec();
    if (!auction) throw boom.badRequest('Auction does not exist.');
    return res.json({
        auction: auction,
        success: true
    });
}));

router.post('/', authenticated('admin'), validate(dto), asyncMid(async (req, res) => {
  const auction = await Auction.create(req.body);
  res.json({ success: true, data: auction });
}));

router.post('/edit/:id', authenticated('admin'), validate(dto), asyncMid(async (req, res) => {
    const id = req.params.id;
    const update = req.body.update;
    await Auction.findOneAndUpdate({_id: id}, update).exec();
}));

router.post('/delete/:id', authenticated('admin'), validate(dto), asyncMid(async (req, res) => {
    const id = req.params.id;
    const update = req.body.update;
    await Auction.findOneAndDelete({_id: id}, update).exec();
}));

export default router;