import db from '../models';

// Get all Acreage

export const getAcreagesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Acreage.findAll({
        raw: true,
        attributes: ['code', 'value'],
      });
      resolve({
        error: response ? 0 : 1,
        message: response ? 'Ok' : 'Failed to get Acreages',
        response: response,
      });
    } catch (error) {
      console.log('get Acreages Service Error: ', error);
      reject(error);
    }
  });
