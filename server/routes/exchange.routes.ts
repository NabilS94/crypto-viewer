import { Router } from 'express';
import * as exchangeController from '../controllers/exchange.controller';

const router = Router();

router.get('/', exchangeController.getAllExchanges);

export default router;
