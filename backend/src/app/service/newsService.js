const { News, User } = require('../models')

const getAll = async () => {
  return News.findAll({
    include: [
      {
        model: User,
        as: 'author'
      }
    ]
  });
}

const create = async (data) => {
  return News.create(data);
}

const dislike = async (id) => {
  const news = await News.findByPk(id, {
    include: [
      {
        model: User,
        as: 'author'
      }
    ]
  });
  const newLike = news.dislike += 1;
  return news.update({
    dislike: newLike
  })
}

const like = async (id) => {
  const news = await News.findByPk(id, {
    include: [
      {
        model: User,
        as: 'author'
      }
    ]
  });
  const newLike = news.like += 1;
  return news.update({
    like: newLike
  })
}

module.exports = {
  getAll,
  create,
  dislike,
  like
};