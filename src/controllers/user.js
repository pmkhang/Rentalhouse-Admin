import * as userService from '../services/user';

export const getUsersData = async (req, res) => {
  try {
    const response = await userService.getUsersDataService();
    return res.status(200).json(response);
  } catch (error) {
    console.log('Controller getUsersData Error: ', error);
    return res.status(500).json({
      error: -1,
      message: 'Failed at getUsersData controller: ' + error,
    });
  }
};
