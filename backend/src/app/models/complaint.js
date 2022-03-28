const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Complaint extends Model {
    static associate(models) {
      Complaint.belongsTo(models.User, {
        foreignKey: "authorId",
        as: "author",
      }),
        Complaint.belongsTo(models.News, { foreignKey: "newsId", as: "news" });
    }
  }
  Complaint.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      msg: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Complaint",
    }
  );
  return Complaint;
};
