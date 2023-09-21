import { v4 } from 'uuid';
import db from '../models';
import { Op } from 'sequelize';
import generateCode from '../utils/generateCode';
import moment from 'moment';
require('dotenv').config();

export const getPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const idSet = new Set();

      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
          { model: db.Image, as: 'images', attributes: ['image'] },
          { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
          { model: db.User, as: 'users', attributes: ['name', 'phone', 'zalo'] },
          { model: db.Label, as: 'labels', attributes: ['code', 'value'] },
        ],
        attributes: ['id', 'title', 'star', 'address', 'desc'],
      });

      // Lọc các Id trùng lặp
      const filteredResponse = response.filter((post) => {
        if (!idSet.has(post.id)) {
          idSet.add(post.id);
          return true;
        }
        return false;
      });

      resolve({
        error: filteredResponse.length > 0 ? 0 : 1,
        message: filteredResponse.length > 0 ? 'Ok' : 'No unique posts found',
        response: filteredResponse,
      });
    } catch (error) {
      console.log('Error getPostsService: ', error);
      reject(error);
    }
  });

// export const getPostsLimitService = (page, query) =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const idSet = new Set();

//       const response = await db.Post.findAndCountAll({
//         where: query,
//         raw: true,
//         nest: true,
//         offset: page * +process.env.LIMIT || 0,
//         limit: +process.env.LIMIT,
//         include: [
//           { model: db.Image, as: 'images', attributes: ['image'] },
//           { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
//           { model: db.User, as: 'users', attributes: ['name', 'phone', 'zalo'] },
//           { model: db.Label, as: 'labels', attributes: ['code', 'value'] },
//         ],
//         attributes: ['id', 'title', 'star', 'address', 'desc'],
//       });

//       const { count, rows } = response;

//       // Filter the rows (posts)
//       const filteredResponse = rows.filter((post) => {
//         if (!idSet.has(post.id)) {
//           idSet.add(post.id);
//           return true;
//         }
//         return false;
//       });

//       resolve({
//         error: filteredResponse.length > 0 ? 0 : 1,
//         message: filteredResponse.length > 0 ? 'Ok' : 'No unique posts found',
//         response: {
//           count: count,
//           rows: filteredResponse,
//         },
//       });
//     } catch (error) {
//       console.log('Error getPostsService: ', error);
//       reject(error);
//     }
//   });

export const getPostsLimitService = (page, query, { priceNumber, acreageNumber }) =>
  new Promise(async (resolve, reject) => {
    try {
      const idSet = new Set();
      const offset = !page || +page <= 1 ? 0 : +page - 1;
      const queries = { ...query };
      if (priceNumber) queries.priceNumber = { [Op.between]: priceNumber };
      if (acreageNumber) queries.acreageNumber = { [Op.between]: acreageNumber };
      const response = await db.Post.findAndCountAll({
        where: queries,
        raw: true,
        nest: true,
        offset: offset * +process.env.LIMIT,
        order: [['createdAt', 'DESC']],
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: 'images', attributes: ['image'] },
          { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
          { model: db.User, as: 'users', attributes: ['name', 'phone', 'zalo'] },
          { model: db.Label, as: 'labels', attributes: ['code', 'value'] },
        ],
        attributes: ['id', 'title', 'star', 'address', 'desc'],
      });
      const { count, rows } = response;
      const filteredResponse = rows.filter((post) => {
        if (!idSet.has(post.id)) {
          idSet.add(post.id);
          return true;
        }
        return false;
      });
      resolve({
        error: filteredResponse.length > 0 ? 0 : 1,
        message: filteredResponse.length > 0 ? 'Ok' : 'No unique posts found',
        response: {
          count: count,
          rows: filteredResponse,
        },
      });
    } catch (error) {
      reject(error);
    }
  });

export const getNewPostsService = () =>
  new Promise(async (resolve, reject) => {
    const idSet = new Set();

    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        offset: 0,
        order: [['createdAt', 'DESC']],
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: 'images', attributes: ['image'] },
          { model: db.Attribute, as: 'attributes', attributes: ['price'] },
        ],
        attributes: ['id', 'title', 'star', 'createdAt'],
      });

      const filteredResponse = response.filter((post) => {
        if (!idSet.has(post.id)) {
          idSet.add(post.id);
          return true;
        }
        return false;
      });

      resolve({
        error: filteredResponse.length > 0 ? 0 : 1,
        message: filteredResponse.length > 0 ? 'Ok' : 'No unique posts found',
        response: filteredResponse,
      });
    } catch (error) {
      reject(error);
    }
  });

export const createNewPostService = (body, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const postID = generateCode(v4() + attributesID);
      const attributesID = generateCode(v4() + v4());
      const overviewID = generateCode(v4() + v4() + v4());
      const imagesID = generateCode(v4() + v4() + v4() + v4());
      const labelCode = generateCode(body?.label.trim());
      const hashtag = generateCode(v4() + v4() + v4() + v4() + v4());
      const province = body?.provinceName?.replace(/thành phố|Thành phố|Thành Phố|tỉnh|Tỉnh/g, '').trim();
      const currentDate = new Date();

      await db.Post.create({
        id: postID,
        title: body?.title,
        star: body?.star,
        labelCode: labelCode,
        address: body?.address,
        attributesID: attributesID,
        categoryCode: body?.categoryCode,
        desc: JSON.stringify(body?.desc),
        userID: id,
        overviewID: overviewID,
        imagesID: imagesID,
        priceCode: body?.priceCode,
        acreageCode: body?.acreageCode,
        provinceCode: generateCode(province),
        priceNumber: +body?.priceNumber,
        acreageNumber: +body?.acreageNumber,
      });

      await db.Attribute.create({
        id: attributesID,
        price: `${
          body?.priceNumber >= 1 ? body?.priceNumber + ' triệu/tháng' : body?.priceNumber * 10 ** 6 + ' đồng/tháng'
        }`,
        acreage: body?.acreageNumber + 'm2',
        published: moment(currentDate).format('DD/MM/YYYY'),
        hashtag: '#' + hashtag,
      });

      await db.Image.create({
        id: imagesID,
        image: body?.images,
      });

      await db.Overview.create({
        id: overviewID,
        code: '#' + hashtag,
        area: body?.label,
        type: body?.categoryName,
        target: body?.target,
        bonus: 'Tin thường',
        created: moment(currentDate).format('DD/MM/YYYY'),
        expired: moment(moment(currentDate).format('DD/MM/YYYY'), 'DD/MM/YYYY').add(30, 'days').format('DD/MM/YYYY'),
      });

      await db.Province.findOrCreate({
        where: { code: generateCode(province) },
        defaults: {
          code: generateCode(province),
          value: province,
        },
      });

      await db.Label.findOrCreate({
        where: { code: labelCode },
        defaults: {
          code: labelCode,
          value: body?.label,
        },
      });
      resolve({
        error: 0,
        message: 'Ok',
      });
    } catch (error) {
      console.log('Create Post Fail: ', error);
      reject(error);
    }
  });
