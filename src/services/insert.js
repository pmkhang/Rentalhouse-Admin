import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import chothuecanho from '../../data/chothuecanho.json';
import chothuematbang from '../../data/chothuematbang.json';
import chothuenha from '../../data/chothuenha.json';
import chothuephongtro from '../../data/chothuephongtro.json';
import db from '../models';
import generateCode from '../utils/generateCode';
import { dataAcreage, dataPrice } from '../utils/data';
import { getNumberFromSting } from '../utils/common';

//npx sequelize-cli db:migrate:undo:all
//npx sequelize-cli db:migrate

const insertService = () => {
  const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(12));
  // const dataBody = chothuephongtro.body;
  const dataBody = [
    {
      body: chothuephongtro.body,
      code: 'chothuephongtro',
    },
    {
      body: chothuematbang.body,
      code: 'chothuematbang',
    },
    {
      body: chothuecanho.body,
      code: 'chothuecanho',
    },
    {
      body: chothuenha.body,
      code: 'chothuenha',
    },
  ];
  return new Promise(async (resolve, reject) => {
    try {
      const provinceCodes = [];
      const labelCodes = [];

      dataBody.forEach((cate) => {
        cate.body.forEach(async (item) => {
          const postID = generateCode(v4() + attributesID);
          const attributesID = generateCode(v4() + v4());
          const userID = generateCode(
            item?.contact?.content.find((i) => i.name === 'Điện thoại:')?.content +
              item?.contact?.content.find((i) => i.name === 'Liên hệ:')?.content,
          );
          const overviewID = generateCode(v4() + v4() + v4());
          const imagesID = generateCode(v4() + v4() + v4() + v4());
          const labelCode = generateCode((item?.header?.class?.classType).trim());
          labelCodes?.every((i) => i?.code !== labelCode) &&
            labelCodes.push({
              code: labelCode,
              value: item?.header?.class?.classType,
            });
          const currentAcreage = getNumberFromSting(item?.header?.attribute?.acreage);
          const currentPrices = getNumberFromSting(item?.header?.attribute?.price);
          const provinceCode = generateCode(item?.header?.address?.split(',')?.slice(-1)[0].trim());
          provinceCodes?.every((i) => i?.code !== provinceCode) &&
            provinceCodes.push({
              code: provinceCode,
              value: item?.header?.address?.split(',')?.slice(-1)[0].trim(),
            });

          //insert Post
          await db.Post.create({
            id: postID,
            title: item?.header?.title,
            star: item?.header?.star,
            labelCode: labelCode,
            address: item?.header?.address,
            attributesID: attributesID,
            categoryCode: cate.code,
            desc: JSON.stringify(item?.mainContent?.content),
            userID: userID,
            overviewID: overviewID,
            imagesID: imagesID,
            priceCode: dataPrice.find((i) => i.max > currentPrices && i.min <= currentPrices)?.code,
            acreageCode: dataAcreage.find((i) => i.max > currentAcreage && i.min <= currentAcreage)?.code,
            provinceCode: provinceCode,
          });

          //insert Attribute
          await db.Attribute.create({
            id: attributesID,
            price: item?.header?.attribute?.price,
            acreage: item?.header?.attribute?.acreage,
            published: item?.header?.attribute?.published,
            hashtag: item?.header?.attribute?.hashtag,
          });

          //insert Image
          await db.Image.create({
            id: imagesID,
            image: JSON.stringify(item?.images),
          });

          //insert Overview
          await db.Overview.create({
            id: overviewID,
            code: item?.overview?.content.find((i) => i.name === 'Mã tin:')?.content,
            area: item?.overview?.content.find((i) => i.name === 'Khu vực')?.content,
            type: item?.overview?.content.find((i) => i.name === 'Loại tin rao:')?.content,
            target: item?.overview?.content.find((i) => i.name === 'Đối tượng thuê:')?.content,
            bonus: item?.overview?.content.find((i) => i.name === 'Gói tin:')?.content,
            created: item?.overview?.content.find((i) => i.name === 'Ngày đăng:')?.content,
            expired: item?.overview?.content.find((i) => i.name === 'Ngày hết hạn:')?.content,
          });
          await db.User.findOrCreate({
            where: { id: userID },
            defaults: {
              id: userID,
              name: item?.contact?.content.find((i) => i.name === 'Liên hệ:')?.content,
              password: hashPassword('123456'),
              phone: item?.contact?.content.find((i) => i.name === 'Điện thoại:')?.content,
              zalo: item?.contact?.content.find((i) => i.name === 'Zalo')?.content,
            },
          });
        });
      });

      provinceCodes?.forEach(async (item) => {
        await db.Province.create({
          code: item?.code,
          value: item?.value,
        });
      });

      labelCodes?.forEach(async (item) => {
        await db.Label.create({
          code: item?.code,
          value: item?.value,
        });
      });

      console.log('Done.');
      resolve('Done.');
    } catch (error) {
      console.log('Error insertService: ', error);
      reject(error);
    }
  });
};

export default insertService;

export const createPricesAndAcreage = () =>
  new Promise((resolve, reject) => {
    try {
      dataPrice.forEach(async (i) => {
        await db.Price.create({
          code: i.code,
          value: i.value,
        });
      });

      dataAcreage.forEach(async (i) => {
        await db.Acreage.create({
          code: i.code,
          value: i.value,
        });
      });
      resolve('Ok Price');
    } catch (error) {
      console.log('create error: ', error);
      reject(error);
    }
  });
