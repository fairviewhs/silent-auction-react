import { Document, Schema, Model, model} from "mongoose";

export interface IBid {
  amount: number;
}

export interface IBidModel extends Document, IBid {}

const schema: Schema = new Schema({
  amount: { required: true, type: Number },
  user: { required: true, type: Schema.Types.ObjectId, ref: 'user' },
  item: { required: true, type: Schema.Types.ObjectId, ref: 'item' }
});

export const Bid: Model<IBidModel> = model('bid', schema);