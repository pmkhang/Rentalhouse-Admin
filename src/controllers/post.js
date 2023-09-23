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

// export const getPostsLimit = async (req, res) => {
//   const { page, query } = req.query;
//   console.log(query);
//   try {
//     const response = await postService.getPostsLimitService(page, query);
//     return res.status(200).json(response);
//   } catch (error) {
//     return res.status(500).json({
//       error: -1,
//       message: 'Failed at post controller: ' + error,
//     });
//   }
// };

export const getPostsLimit = async (req, res) => {
  const { page, priceNumber, acreageNumber, ...query } = req.query;
  try {
    const response = await postService.getPostsLimitService(page, query, { priceNumber, acreageNumber });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: 'Failed at getPostsLimit controller: ' + error,
    });
  }
};

export const getNewPosts = async (req, res) => {
  try {
    const response = await postService.getNewPostsService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: 'Failed at getNewPosts controller: ' + error,
    });
  }
};

export const createNewPost = async (req, res) => {
  try {
    const { categoryCode, title, priceNumber, acreageNumber, label } = req.body;
    const { id } = req.user;
    if (!categoryCode || !id || !title || !priceNumber || !acreageNumber || !label) {
      return res.status(400).json({
        error: 1,
        message: 'Missing inputs',
      });
    }
    const response = await postService.createNewPostService(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error: -1,
      message: 'Failed at createNewPost controller: ' + error.message,
    });
  }
};
export const getUserPosts = async (req, res) => {
  const { page, ...query } = req.query;
  const { id } = req.user;
  try {
    if (!id)
      return res.status(400).json({
        error: 1,
        message: 'Missing id',
      });
    const response = await postService.getUserPostsService(page, id, query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: 'Failed at getUserPosts controller: ' + error,
    });
  }
};

export const updateUserPosts = async (req, res) => {
  const { postID, overviewID, imagesID, attributesID, ...body } = req.body;
  const { id } = req.user;
  try {
    if (!postID || !id || !overviewID || !imagesID || !attributesID)
      return res.status(400).json({
        error: 1,
        message: 'Missing inputs',
      });
    const response = await postService.updateUserPostsService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: 'Failed at getUserPosts controller: ' + error,
    });
  }
};
