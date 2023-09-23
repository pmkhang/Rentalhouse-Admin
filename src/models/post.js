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
      Post.belongsTo(models.Image, { foreignKey: 'imagesID', targetKey: 'id', as: 'images' });
      Post.belongsTo(models.Attribute, { foreignKey: 'attributesID', targetKey: 'id', as: 'attributes' });
      Post.belongsTo(models.Overview, { foreignKey: 'overviewID', targetKey: 'id', as: 'overviews' });
      Post.belongsTo(models.User, { foreignKey: 'userID', targetKey: 'id', as: 'users' });
      Post.belongsTo(models.Label, { foreignKey: 'labelCode', targetKey: 'code', as: 'labels' });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      star: DataTypes.STRING,
      labelCode: DataTypes.STRING,
      provinceCode: DataTypes.STRING,
      address: DataTypes.STRING,
      attributesID: DataTypes.STRING,
      categoryCode: DataTypes.STRING,
      desc: DataTypes.TEXT,
      userID: DataTypes.STRING,
      overviewID: DataTypes.STRING,
      imagesID: DataTypes.STRING,
      priceCode: DataTypes.STRING,
      priceNumber: DataTypes.DECIMAL(10, 2),
      acreageCode: DataTypes.STRING,
      acreageNumber: DataTypes.INTEGER,
      //TODO: isDisable
      //TODO: modifiedBy
    },
    {
      sequelize,
      modelName: 'Post',
    },
  );
  return Post;
};
