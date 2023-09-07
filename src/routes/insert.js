import express from 'express';
import insert from '../controllers/insert';

const router = express.Router();
router.post('/', insert);

export default router;
