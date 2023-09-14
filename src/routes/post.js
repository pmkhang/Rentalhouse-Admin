import express from 'express';
import * as postController from '../controllers/post';

const router = express.Router();

router.get('/all-posts', postController.getPosts);
router.get('/all-posts-limit', postController.getPostsLimit);
router.get('/all-new-posts', postController.getNewPosts);

export default router;
