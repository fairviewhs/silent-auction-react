import { Document, Schema, Model, model} from "mongoose";

export interface IAdmin {
  email: string;
  password: string;
}

export interface IAdminModel extends Document, IAdmin {}

const schema: Schema = new Schema({
  email: { required: true, type: String },
  password: { required: true, type: String }
});

export const Admin: Model<IAdminModel> = model('admin', schema);