const newsService = require('../service/newsService');

const getAll = async (req, res) => {
  const news = await newsService.getAll();
  return res.status(200).json({ news });
}

const create = async (req, res) => {
  const news = await newsService.create(req.body);
  return res.status(201).json({ news });
}

const dislike = async (req, res) => {
  const news = await newsService.dislike(req.params.id);
  return res.status(201).json({ news });
}

const like = async (req, res) => {
  const news = await newsService.like(req.params.id);
  return res.status(201).json({ news });
}

module.exports = {
  getAll,
  create,
  dislike,
  like
};