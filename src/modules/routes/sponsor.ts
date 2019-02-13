import express from 'express';
import asyncMid from '../middleware/asyncMid';
import { Sponsor } from '../models/sponsor';
import joi from 'joi';
import validate from '../middleware/validate';
import { Auction } from '../models/auction';
import authenticated from '../middleware/authenticated';

const router = express.Router();

router.get('/:auctionId', asyncMid(async (req, res) => {
    const auctionId = req.params.auctionId;
    const sponsors = await Sponsor.find({auction: auctionId}).exec();
    res.json(sponsors);
}));

const dto = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    auctionIds: joi.array().items(joi.string().required()).required()
}).required()

// TODO
router.post('/', authenticated('admin'), validate(dto), asyncMid(async (req, res) => {
    const { name, image, auctionIds } = req.body;

    const sponsor = await Sponsor.create({
        name,
        image,
        auctions: auctionIds
    });
    const auctions = await Auction.find({ _id: { $in: auctionIds } }).exec();
    await Promise.all(auctions.map(async (auction) => await auction.update({ $push: { sponsors: sponsor._id } }).exec()));

    res.json({
        success: true,
        message: 'Created the sponsor item.'
    })
}))

export default router;