import db from '../models';

// Get all Price

export const getPricesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Price.findAll({
        raw: true,
        attributes: ['code', 'value'],
      });
      resolve({
        error: response ? 0 : 1,
        message: response ? 'Ok' : 'Failed to get Prices',
        response: response,
      });
    } catch (error) {
      console.log('get Prices Service Error: ', error);
      reject(error);
    }
  });

