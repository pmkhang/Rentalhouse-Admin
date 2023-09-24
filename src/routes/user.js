import express from 'express';
import * as controller from '../controllers/user';
import * as controller1 from '../controllers/oneUser';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

// router.get('/all-users-data', controller.getUsersData);

router.use(verifyToken);
router.get('/user-data', controller1.getUserByID);
router.put('/update-user-data', controller1.updateUserByID);

export default router;
