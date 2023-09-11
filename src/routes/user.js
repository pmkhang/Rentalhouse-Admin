import express from 'express';
import * as controller from '../controllers/user';

const router = express.Router();

router.get('/all-users-data', controller.getUsersData);

export default router;
