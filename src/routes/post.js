import express from 'express';
import * as postController from '../controllers/post';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.get('/all-posts', postController.getPosts);
router.get('/all-posts-limit', postController.getPostsLimit);
router.get('/all-new-posts', postController.getNewPosts);

router.use(verifyToken);
router.post('/create-new', postController.createNewPost);
router.get('/user-posts', postController.getUserPosts);
router.put('/update-user-post', postController.updateUserPosts);

export default router;
