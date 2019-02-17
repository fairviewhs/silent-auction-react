import { Document, Schema, Model, model} from "mongoose";

export interface IItem {
  name: string;
  price: number;
  description: string;
  picture_file_path: string;
  picture2_file_path: string;
  picture3_file_path: string;
  picture_file_name: string;
  picture2_file_name: string;
  picture3_file_name: string;
}

export interface IItemModel extends Document, IItem {}

const schema: Schema = new Schema({
  amount: { required: true, type: Number },
  auction: { required: true, type: Schema.Types.ObjectId, ref: 'auction' },
  bids: [{ required: true, type: Schema.Types.ObjectId, ref: 'bid' }]
});

export const Item: Model<IItemModel> = model('item', schema);