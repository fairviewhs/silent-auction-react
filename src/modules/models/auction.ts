import { Document, Schema, Model, model} from "mongoose";

export interface IAuction {
  name: string;
  host: string;
  description: string;
  start_time: Date;
  end_time: Date;
}

export interface IAuctionModel extends Document, IAuction {
  isAdmin(): boolean;
}

const schema: Schema = new Schema({
  name: { required: true, type: String },
  host: { required: true, type: String },
  description: { required: true, type: String },
  start_time: { required: true, type: Date },
  end_time: { required: true, type: Date },
  admins: [{ required: true, type: Schema.Types.ObjectId, ref: 'admin' }],
  items: [{ required: true, type: Schema.Types.ObjectId, ref: 'item' }],
  donations: [{ required: true, type: Schema.Types.ObjectId, ref: 'donation' }]
});

schema.methods.isAdmin = () => false;

export const Auction: Model<IAuctionModel> = model('auction', schema);