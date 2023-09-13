import express from 'express';
import * as controller from '../controllers/acreage';

const router = express.Router();

router.get('/all-acreages', controller.getAcreages);

export default router;
