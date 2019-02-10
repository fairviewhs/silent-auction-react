import express, { Request, Response } from 'express';
import joi from 'joi';
import validate from '../middleware/validate';
import asyncMid from '../middleware/asyncMid';
import { User } from '../models/user';
import { Auction } from '../models/auction';
import boom = require('boom');

const router = express.Router();

const dto = joi.object({
  name: joi.string().required(),
  image: joi.string().required(),
  start_price: joi.number().required(),
  description: joi.string().required()
}).required()

router.get('/:id', asyncMid(async (req, res) => {
    const id = req.params.id;
    const auction = await Auction.findOne({_id: id}).exec();
    if (!auction) throw boom.badRequest('Auction does not exist.');
    return res.json({
        auction: auction,
        success: true
    });
}));

router.post('/create', validate(dto), (req, res) => {
    let auction = new Auction;
    const {name, image, start_price, description, start_time, end_time} = req.body;
    auction.name = name;
    auction.image = image;
    auction.start_price = start_price;
    auction.description = description;
    auction.start_time = start_time;
    auction.end_time = end_time;

    auction.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.post('/edit/:id', validate(dto), asyncMid(async (req, res) => {
    const id = req.params.id;
    const {name, image, start_price, description, start_time, end_time} = req.body;
    const update = {
        name: name,
        image: image,
        start_price: start_price,
        description: description,
        start_time: start_time,
        end_time: end_time
    };
    await Auction.findOneAndUpdate({_id: id}, update).exec();
}));

router.post('/delete/:id', asyncMid(async (req, res) => {
    const id = req.params.id;
    const auction = Auction.findOne({_id: id}).exec();
    if (!auction) throw boom.badRequest('Auction does not exist.');
    await Auction.findOneAndDelete({_id: id}).exec();
}));

export default router;