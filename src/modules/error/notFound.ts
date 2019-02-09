import { NextFunction, Response, Request } from "express";
import boom from 'boom';

export default (req: Request, res: Response, next: NextFunction) => {
  next(boom.notFound());
}