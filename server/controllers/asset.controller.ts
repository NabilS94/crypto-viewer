import { NextFunction, Request, Response } from 'express';
import { AppError } from '../middleware/error.middleware';
import * as coincapService from '../services/coincap';
import { API } from '../types/api';
import { AssetHistoryIntervals } from '../types/models';

export const getAllAssets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params: API.Req.AssetsParams = {
      search: req.query.search as string,
      ids: req.query.ids as string[],
      limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
      offset: req.query.offset ? parseInt(req.query.offset as string) : undefined
    };

    const data = await coincapService.getAllAssets(params);
    res.json(data);
  } catch (error: any) {
    console.log(error);
    next(new AppError(error.response.status, error.response.data.error));
  }
};

export const getAsset = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = await coincapService.getAsset(id);
    res.json(data);
  } catch (error: any) {
    next(new AppError(error.response.status, error.response.data.error));
  }
};

export const getAssetHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const params: API.Req.AssetsHistoryParams = {
      id,
      interval: req.query.interval as AssetHistoryIntervals,
      duration: {
        start: req.query.start ? parseInt(req.query.start as string) : 0,
        end: req.query.end ? parseInt(req.query.end as string) : 0
      }
    };

    const data = await coincapService.getAssetHistory(params);
    res.json(data);
  } catch (error: any) {
    next(new AppError(error.response.status, error.response.data.error));
  }
};

export const getAssetMarkets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const params: API.Req.AssetsMarketsParams = {
      id,
      limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
      offset: req.query.offset ? parseInt(req.query.offset as string) : undefined
    };

    const data = await coincapService.getAssetMarkets(params);
    res.json(data);
  } catch (error: any) {
    next(new AppError(error.response.status, error.response.data.error));
  }
};
