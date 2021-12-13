const { News } = require('../models')

const getAll = async () => {
  return News.findAll();
}

const create = async (data) => {
  return News.create(data);
}

module.exports = {
  getAll,
  create
};