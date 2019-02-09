import joi, { SchemaLike } from 'joi';
import boom from 'boom';
import { Request, Response, NextFunction } from 'express';

export default (joiSchema: SchemaLike) => (req: Request, res: Response, next: NextFunction) => {
  joi.validate(req.body, joiSchema)
    .then(() => next())
    .catch((error: any) => next(boom.badData(undefined, { validation: error.details })));
}