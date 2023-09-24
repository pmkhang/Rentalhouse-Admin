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

export const updateUserByID = async (req, res) => {
  const { id } = req.user;
  const { name } = req.body;
  try {
    if (!id || !name) {
      return res.status(400).json({
        error: 1,
        message: 'Missing inputs',
      });
    }
    const response = await userService.updateUserByIDService(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    console.log('Controller updateUserByID Error: ', error);
    return res.status(500).json({
      error: -1,
      message: 'Failed at updateUserByID controller: ' + error,
    });
  }
};
