const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      reporter: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      password: {
        type: DataTypes.VIRTUAL,
      },
      passwordHash: {
        type: DataTypes.STRING,
      }
    },
    {
      sequelize,
      modelName: 'User'
    }
  );

  User.addHook('beforeSave', async (user) => {
    if (user.password) {
      user.passwordHash = await bcrypt.hash(user.password, 5);
    }

    return user;
  });

  return User;
}
