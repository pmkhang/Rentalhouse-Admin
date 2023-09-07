import db from '../models';

// Get all Category

export const getCategoriesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({
        raw: true,
        attributes: ['code', 'value'],
      });
      resolve({
        error: response ? 0 : 1,
        message: response ? 'Ok' : 'Failed to get categories',
        response: response,
      });
    } catch (error) {
      console.log('get Categories Service Error: ', error);
      reject(error);
    }
  });
