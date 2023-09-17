import db from '../models';
import { Op } from 'sequelize';
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
        order: [['createdAt','DESC']],
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
