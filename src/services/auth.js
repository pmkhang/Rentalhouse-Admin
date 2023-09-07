import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import db from '../models';
import dotenv from 'dotenv';
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
          id: v4(),
        },
      });
      const token =
        response[1] &&
        jwt.sign({ id: response[0].id, phone: response[0].phone }, process.env.SECRET_KEY, { expiresIn: '2d' });
      resolve({
        error: token ? 0 : 2,
        message: token ? 'Register is successfully !' : 'Phone number has been aldready used !',
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
        error: token ? 0 : 2,
        message: token ? 'login is successfully !' : response ? 'Password is wrong !' : 'Phone number not found !',
        token: token || null,
      });
    } catch (error) {
      console.log('Error loginService: ', error);
      reject(error);
    }
  });
};
