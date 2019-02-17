import { Request, Response, NextFunction } from "express";
import boom from 'boom';

export const exists = (required: string[]) => (req: Request, res: Response, next: NextFunction) => {
  required.forEach(requiredProperty => {
    if (!req.body[requiredProperty]) {
      next(boom.badRequest('Properties are missing.', {
        success: false,
        errors: [
          `${requiredProperty} is a required field`
        ]
      }))
    }
  })
  next();
};