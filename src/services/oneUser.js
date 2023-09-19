import db from '../models';

// Get all One User by ID

export const getUserByIDService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id },
        raw: true,
        attributes: {
          exclude: ['password'],
        },
      });
      resolve({
        error: response ? 0 : 1,
        message: response ? 'Ok' : 'Failed to get getUserByIDService',
        response: response,
      });
    } catch (error) {
      console.log('get getUserByIDService Service Error: ', error);
      reject(error);
    }
  });
