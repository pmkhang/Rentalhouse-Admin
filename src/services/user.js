import db from '../models';

// Get all Category

export const getUsersDataService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findAll({
        raw: true,
        attributes: ['id', 'name', 'phone', 'zalo'],
      });
      resolve({
        error: response ? 0 : 1,
        message: response ? 'Ok' : 'Failed to get UserDataService',
        response: response,
      });
    } catch (error) {
      console.log('get UserDataService Service Error: ', error);
      reject(error);
    }
  });


