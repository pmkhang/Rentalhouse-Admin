import db from '../models';

// Get all Province

export const getProvincesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Province.findAll({
        raw: true,
        attributes: ['code', 'value'],
      });
      resolve({
        error: response ? 0 : 1,
        message: response ? 'Ok' : 'Failed to get Provinces',
        response: response,
      });
    } catch (error) {
      console.log('get Provinces Service Error: ', error);
      reject(error);
    }
  });
