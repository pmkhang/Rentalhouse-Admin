import * as service from '../services/acreage';

export const getAcreages = async (req, res) => {
  try {
    const response = await service.getAcreagesService();
    return res.status(200).json(response);
  } catch (error) {
    console.log('Controller get Acreages Error: ', error);
    return res.status(500).json({
      error: -1,
      message: 'Failed at price controller: ' + error,
    });
  }
};
