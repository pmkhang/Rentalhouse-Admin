import insertService from '../services/insert';

const insert = async (req, res) => {
  try {
    const response = await insertService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error: -1,
      message: 'Fail at insert controller: ' + error,
    });
  }
};

export default insert;
