const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class News extends Model {

    static associate(models) {
      News.belongsTo(models.User, { foreignKey: 'id', as: 'authorId' })
    }

  }
  News.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      msg: {
        type: DataTypes.STRING,
        allowNull: false
      },
      like: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      dislike: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: 'News'
    })
  return News;
}
