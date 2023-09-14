import * as service from '../services/province';

export const getProvince = async (req, res) => {
  try {
    const response = await service.getProvincesService();
    return res.status(200).json(response);
  } catch (error) {
    console.log('Controller getProvince Error: ', error);
    return res.status(500).json({
      error: -1,
      message: 'Failed at getProvince controller: ' + error,
    });
  }
};
