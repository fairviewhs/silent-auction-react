import { Document, Schema, Model, model} from "mongoose";

export interface IUser {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface IUserModel extends Document, IUser {}

const schema: Schema = new Schema({
  amount: { required: true, type: Number },
  donations: [{ type: Schema.Types.ObjectId, ref: 'donation' }],
  bids: [{ type: Schema.Types.ObjectId, ref: 'bid' }]
});

export const User: Model<IUserModel> = model('user', schema);