const { User } = require('../models')
const authService = require('./authService')

const getAll = async () => {
  return User.findAll();
}

const create = async (data) => {
  const user = await User.create(data);

  if (!user) {
    return null;
  }

  delete user.dataValues.passwordHash;
  delete user.dataValues.password;

  return {
    user,
    token: authService.generateToken({ id: user.id, email: user.email }),
  };
}

module.exports = {
  getAll,
  create
};