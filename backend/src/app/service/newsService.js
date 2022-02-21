const { News, User } = require('../models')
const { Op } = require('sequelize');

const getAll = async (query) => {
  const { authorName, msg } = query;

  let whereAuthor = {};
  let whereNews = {};

  if (msg) {
    whereNews = {
      msg: {
        [Op.substring]: `${msg}`,
      },
    };
  }
  if (authorName) {
    whereAuthor = {
      name: {
        [Op.substring]: `${authorName}`,
      },
    };
  }

  const page = parseInt(query.page, 10);
  const pageSize = parseInt(query.pageSize, 10);
  let offset = null;
  let news = null;

  if (page && pageSize) offset = (page - 1) * pageSize;

  if (offset !== null) {
    const options = {
      limit: pageSize,
      offset,
      distinct: true,
      where: whereNews,
      include: [
        {
          model: User,
          as: 'author',
          where: whereAuthor
        }
      ]
    };

    news = await News.findAndCountAll(options);

    news.pages = Math.ceil(news.count / pageSize);

  } else {
    news = await News.findAll({
      where: whereNews,
      include: [
        {
          model: User,
          as: 'author',
          where: whereAuthor
        }
      ]
    });
  }

  if (!news) {
    return null;
  }

  return news;
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

const remove = async (id) => {
  const news = await News.findByPk(id);

  if (!news) {
    return null;
  }

  await news.destroy();

  return news;
};

module.exports = {
  getAll,
  create,
  dislike,
  like,
  remove
};