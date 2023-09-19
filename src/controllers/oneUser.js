import * as userService from '../services/oneUser';

export const getUserByID = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await userService.getUserByIDService(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log('Controller getUsersData Error: ', error);
    return res.status(500).json({
      error: -1,
      message: 'Failed at getUsersData controller: ' + error,
    });
  }
};
