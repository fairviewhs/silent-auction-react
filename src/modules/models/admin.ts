import { Document, Schema, Model, model} from "mongoose";
import config from "../../config";
import nodemailer from 'nodemailer';
import fs from 'fs';
import uuid from 'node-uuid';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.get('secrets.mail.user') as string,
    pass: config.get('secrets.mail.pass') as string
  }
})

export interface IAdmin {
  email: string;
  password: string;
  name: string;
  confirm_token: string;
  confirmed_email: boolean;
  super_admin: boolean;
}

export interface IAdminModel extends Document, IAdmin {
  send_confirmation(): Promise<void>;
}

const schema: Schema = new Schema({
  email: { required: true, type: String },
  password: { required: true, type: String },
  name: { required: true, type: String },
  confirm_token: { required: true, type: String },
  confirmed_email: { required: true, type: Boolean, default: false },
  super_admin: { required: true, type: Boolean, default: false }
});

schema.pre('save', function(this: IAdminModel) {
  this.confirm_token = uuid.v4();
});

schema.methods.send_confirmation = async function(): Promise<void> {
  transporter.sendMail({
    from: 'SilentAuctions <silentauction@fairviewhs.org>',
    to: this.email,
    subject: 'Silent Auction Account Confirmation',
    html: ejs.render(
      fs.readFileSync(__dirname+'/../views/mail/password/create.ejs', 'ascii'),
      { name: this.name, confirm_url: `${config.get('apiRoot')}/user/confirm/${this.confirm_token}` }
    )
  })
}

export const Admin: Model<IAdminModel> = model('admin', schema);