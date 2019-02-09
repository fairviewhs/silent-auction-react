import { Request, Response, NextFunction } from "express";

type AsyncRoute = (req: Request, res: Response) => Promise<any>;

export default (asyncRoute: AsyncRoute) => (req: Request, res: Response, next: NextFunction) => {
  asyncRoute(req, res)
    .catch(error => next(error));
}