const newsService = require('../service/newsService');

const getAll = async (req, res) => {
  const news = await newsService.getAll();
  return res.status(200).json({ news });
}

const create = async (req, res) => {
  const news = await newsService.create(req.body);
  return res.status(200).json({ news });
}

module.exports = {
  getAll,
  create
};