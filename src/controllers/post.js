import * as postService from '../services/post';

export const getPosts = async (req, res) => {
  try {
    const response = await postService.getPostsService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error: -1,
      message: 'Failed at post controller: ' + error,
    });
  }
};

export const getPostsLimit = async (req, res) => {
  const { page } = req.query;
  try {
    const response = await postService.getPostsLimitService(page);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error: -1,
      message: 'Failed at post controller: ' + error,
    });
  }
};
