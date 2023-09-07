import * as categoryService from '../services/category';

export const getCategories = async (req, res) => {
  try {
    const response = await categoryService.getCategoriesService();
    return res.status(200).json(response);
  } catch (error) {
    console.log('Controller get Categories Error: ', error);
    return res.status(500).json({
      error: -1,
      message: 'Failed at category controller: ' + error,
    });
  }
};
