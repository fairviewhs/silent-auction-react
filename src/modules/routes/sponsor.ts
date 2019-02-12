import express, { Request, Response } from 'express';
import joi, { raw } from 'joi';
import validate from '../middleware/validate';
import asyncMid from '../middleware/asyncMid';
import { Auction } from '../models/auction';
import { Sponsor } from '../models/sponsor';
import boom = require('boom');

const router = express.Router();

router.get('/:auctionId', asyncMid(async (req, res) => {
    const auctionId = req.params.auctionId;
    const sponsors = await Sponsor.find({auction: auctionId}).exec();
    res.json(sponsors);
}));

export default router;