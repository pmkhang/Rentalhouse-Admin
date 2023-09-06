'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Post extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
      }
   }
   Post.init(
      {
         title: DataTypes.STRING,
         star: DataTypes.STRING,
         labelCode: DataTypes.STRING,
         address: DataTypes.STRING,
         attributesID: DataTypes.STRING,
         categoryCode: DataTypes.STRING,
         desc: DataTypes.TEXT,
         userID: DataTypes.STRING,
         overviewID: DataTypes.STRING,
         imagesID: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: 'Post',
      },
   );
   return Post;
};
