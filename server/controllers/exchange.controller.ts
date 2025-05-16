import { Request, Response, NextFunction } from 'express';
import * as coincapService from '../services/coincap';
import { AppError } from '../middleware/error.middleware';

export const getAllExchanges = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await coincapService.getAllExchanges();
    res.json(data);
  } catch (error: any) {
    next(new AppError(error.response.status, error.response.data.error));
  }
};
