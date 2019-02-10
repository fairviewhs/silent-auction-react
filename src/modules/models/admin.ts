import { Document, Schema, Model, model} from "mongoose";

export interface IAdmin {
  email: string;
  password: string;
  name: string;
  super_admin: boolean;
}

export interface IAdminModel extends Document, IAdmin {}

const schema: Schema = new Schema({
  email: { required: true, type: String },
  password: { required: true, type: String },
  name: { required: true, type: String },
  super_admin: { required: true, type: Boolean, default: false }
});

export const Admin: Model<IAdminModel> = model('admin', schema);