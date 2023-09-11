import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import chothuecanho from '../../data/chothuecanho.json';
import chothuematbang from '../../data/chothuematbang.json';
import chothuenha from '../../data/chothuenha.json';
import chothuephongtro from '../../data/chothuephongtro.json';
import db from '../models';
import generateCode from '../utils/generateCode';

const insertService = () => {
  const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(12));
  const dataBody = chothuecanho.body;

  return new Promise(async (resolve, reject) => {
    try {
      dataBody.forEach(async (item) => {
        const postID = generateCode(v4());
        const attributesID = generateCode(v4() + v4());
        const userID = generateCode(
          item?.contact?.content.find((i) => i.name === 'Điện thoại:')?.content +
            item?.contact?.content.find((i) => i.name === 'Liên hệ:')?.content,
        );
        const overviewID = generateCode(v4() + v4() + v4());
        const imagesID = generateCode(v4() + v4() + v4() + v4());
        const labelCode = generateCode('chothuecanho');
        //insert Post
        await db.Post.create({
          id: postID,
          title: item?.header?.title,
          star: item?.header?.star,
          labelCode: labelCode,
          address: item?.header?.address,
          attributesID: attributesID,
          categoryCode: 'chothuecanho',
          desc: JSON.stringify(item?.mainContent?.content),
          userID: userID,
          overviewID: overviewID,
          imagesID: imagesID,
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

        //insert Label
        await db.Label.findOrCreate({
          where: { code: labelCode },
          defaults: {
            code: labelCode,
            value: item?.header?.class?.classType,
          },
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
      console.log('Done.');
      resolve('Done.');
    } catch (error) {
      console.log('Error insertService: ', error);
      reject(error);
    }
  });
};

export default insertService;
