import { Document, Schema, Model, model} from "mongoose";

export interface IDonation {
  amount: number;
}

export interface IDonationModel extends Document, IDonation {}

const schema: Schema = new Schema({
  amount: { required: true, type: Number },
  user: { required: true, type: Schema.Types.ObjectId, ref: 'user' }
});

export const Donation: Model<IDonationModel> = model('donation', schema);