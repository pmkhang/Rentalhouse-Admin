import express from 'express';
import * as controller from '../controllers/province';

const router = express.Router();

router.get('/all-provinces', controller.getProvince);

export default router;
