import config from "./config";
import { Admin } from "./modules/models/admin";
import bcrypt from 'bcryptjs';

export default async () => {
  if (
    config.get('env') === 'production' && 
      (
        config.get('admin.email') === config.default('admin.email') ||
        config.get('admin.password') === config.default('admin.password')
      )
  ) {
    throw new Error('TRIED TO CREATE AN ADMIN WITH DEFAULTS ON PRODUCTION!');
  }
  await Admin.create({
    email: config.get('admin.email'),
    password: await bcrypt.hash(config.get('admin.password'), 10)
  });
}