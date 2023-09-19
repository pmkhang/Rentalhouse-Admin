import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = async (req, res, next) => {
  const accessToken = await req.headers.authorization?.split(' ')[1];
  if (!accessToken) {
    return res.status(401).json({
      error: 1,
      message: 'Missing acces token',
    });
  }
  jwt.verify(accessToken, process.env.SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(401).json({
        error: 1,
        message: 'Access token expired',
      });
    }
    req.user = user;
    next();
  });
};

export default verifyToken;
