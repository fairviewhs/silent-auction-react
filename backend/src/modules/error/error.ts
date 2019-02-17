import { Request, Response, NextFunction } from "express";
import boom = require("boom");

const isBoomError = (error: any): error is boom => {
  return !!error && !!error.isBoom && error.isBoom;
}

export default (error: any, req: Request, res: Response, next: NextFunction) => {
  const boomError: boom = isBoomError(error) ? error : boom.badImplementation();
  if (!isBoomError(error)) {
    console.log(error)
  }
  res
    .status(boomError.output.statusCode)
    .header(boomError.output.headers)
    .json({
      ...boomError.output.payload,
      data: boomError.data,
      success: false
    });
}