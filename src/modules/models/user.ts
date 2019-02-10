import { Document, Schema, Model, model} from "mongoose";
import { IBid } from "./bid";

export interface IUser {
  name: string;
  email: string;
  phone: string;
}

export interface IUserModel extends Document, IUser {
  bids: IBid[]
}

const schema: Schema = new Schema({
  name: { required: true, type: String },
  email: { required: true, type: String },
  phone: { required: true, type: String },
  bids: [{ type: Schema.Types.ObjectId, ref: 'bid' }]
});

export const User: Model<IUserModel> = model('user', schema);