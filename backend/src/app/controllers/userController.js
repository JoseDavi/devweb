const userService = require('../service/userService');

const getAll = async (req, res) => {
  const users = await userService.getAll();
  return res.status(200).json({ users });
}

const create = async (req, res) => {
  const user = await userService.create(req.body);
  return res.status(200).json({ user });
}

module.exports = {
  getAll,
  create
};