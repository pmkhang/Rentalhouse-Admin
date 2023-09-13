import express from 'express';
import * as controller from '../controllers/price';

const router = express.Router();

router.get('/all-prices', controller.getPrices);

export default router;
