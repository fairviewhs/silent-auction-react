import express from 'express';
import joi from 'joi';
import validate from '../middleware/validate';
import asyncMid from '../middleware/asyncMid';
import boom from 'boom';
import { Item } from '../models/item';
import authenticated from '../middleware/authenticated';
import { User, IUserModel } from '../models/user';
import { Bid } from '../models/bid';
import { Auction } from '../models/auction';

const router = express.Router();

const bidDto = joi.object({ 
  bidPrice: joi.number().required(), 
  itemId: joi.string().required(),
  // auctionId: joi.string().required(),
}).required();

router.post('/', authenticated, validate(bidDto), asyncMid(async (req, res) => {

  // const auction = await Auction.findOne({ _id: req.body.auctionId }).exec();

  // if (!auction) throw boom.badRequest('Auction was not found!');

  const item = await Item.findOne({ _id: req.body.itemId })
    .populate('bids')
    .populate('auction')
    .exec();
  if (!item) {
    throw boom.badRequest('Item not found.');
  }
  if (req.body.bidPrice <= item.price) {
    throw boom.badRequest('Your bid is not high enough!');
  }

  const bid = await Bid.create({ price: req.body.bidPrice, user: req.user._id });
  await (req.user as IUserModel).update({ $push: { bids: bid._id } });
  res.json({
    success: true,
    message: 'Created the bid.'
  })
}));

router.delete('/:id', authenticated, asyncMid(async (req, res) => {
  const deletedBid = await Bid.findOneAndDelete({ _id: req.params.id, user: req.user._id }).exec();
  if (!deletedBid) throw boom.badRequest('Bid was not found!');
  await deletedBid.user.update({ $pull: { bids: deletedBid._id } });
  await deletedBid.item.update({ $pull: { bids: deletedBid._id } });
  res.json({
    success: true,
    message: 'Bid was deleted'
  });
}));

export default router;