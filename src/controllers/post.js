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
  console.log(page, priceNumber, acreageNumber, query);
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
