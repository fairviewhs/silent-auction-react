import { Document, Schema, Model, model} from "mongoose";
import { IAuctionModel } from "./auction";

export interface ISponsor {
  name: string;
  image: string;
}

export interface ISponsorModel extends Document, ISponsor {
  auctions: IAuctionModel[];
}

const schema: Schema = new Schema({
  name: { required: true, type: String },
  image: { required: true, type: String },
  auctions: [{ required: true, type: Schema.Types.ObjectId, ref: "auction" }]
});

export const Sponsor: Model<ISponsorModel> = model('sponsor', schema);