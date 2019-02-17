import { any } from "joi";
import { Model, Document } from "mongoose";

type Condition = {
  where: any;
  default: any;
}

export default async <T extends Document>(model: Model<T>, { where, default: defaultValues }: Condition): Promise<T> => {
  const item = await model.findOne(where).exec();
  if (!item) {
    return await model.create(defaultValues);
  }
  return item;
}