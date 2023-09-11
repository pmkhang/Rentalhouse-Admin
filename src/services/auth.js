import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models';
import dotenv from 'dotenv';
import generateCode from '../utils/generateCode';
dotenv.config();

export const registerService = ({ name, password, phone }) => {
  const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(12));
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { phone },
        defaults: {
          phone,
          name,
          password: hashPassword(password),
          id: generateCode(phone + name),
        },
      });
      const token =
        response[1] &&
        jwt.sign({ id: response[0].id, phone: response[0].phone }, process.env.SECRET_KEY, { expiresIn: '2d' });
      resolve({
        error: token ? 0 : 2,
        message: token ? 'Register is successfully !' : 'Số điện thoại này đã được sử dụng !',
        token: token || null,
      });
    } catch (error) {
      console.log('Error registerService: ', error);
      reject(error);
    }
  });
};

export const loginService = ({ password, phone }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { phone },
        raw: true,
      });
      const isCorrectPassword = response && bcrypt.compareSync(password, response.password);
      const token =
        isCorrectPassword &&
        jwt.sign({ id: response.id, phone: response.phone }, process.env.SECRET_KEY, { expiresIn: '2d' });
      resolve({
        error: token ? 0 : 1,
        message: token
          ? 'login is successfully !'
          : response
          ? 'Bạn đã sai số điện thoại hoặc mật khẩu !'
          : 'Bạn đã sai số điện thoại hoặc mật khẩu !',
        token: token || null,
      });
    } catch (error) {
      console.log('Error loginService: ', error);
      reject(error);
    }
  });
};

//TODO: Logout
