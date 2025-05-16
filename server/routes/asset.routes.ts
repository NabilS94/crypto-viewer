import { Router } from 'express';
import {
  getAllAssets,
  getAsset,
  getAssetHistory,
  getAssetMarkets
} from '../controllers/asset.controller';

const router = Router();

// Get all assets
router.get('/', getAllAssets);

// Get a specific asset by ID
router.get('/:id', getAsset);

// Get asset history
router.get('/:id/history', getAssetHistory);

// Get asset markets
router.get('/:id/markets', getAssetMarkets);

export default router;
