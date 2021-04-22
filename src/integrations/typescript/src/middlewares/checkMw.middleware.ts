import { Request, Response, NextFunction } from 'express';

export const checkMw = async (req: Request, res: Response, next: NextFunction) => {
  next();
};
