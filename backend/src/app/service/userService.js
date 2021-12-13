const { User } = require('../models')

const getAll = async () => {
  return User.findAll();
}

const create = async (data) => {
  return User.create(data);
}

module.exports = {
  getAll,
  create
};