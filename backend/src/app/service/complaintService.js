const { News, User, Complaint } = require("../models");
const { Op } = require("sequelize");

const getAll = async () => {
  const complaint = await Complaint.findAll({
    include: [
      {
        model: User,
        as: "author",
      },
      {
        model: News,
        as: "news",
      },
    ],
  });

  if (!complaint) {
    return null;
  }

  return complaint;
};

const create = async (data) => {
  return Complaint.create(data);
};

const remove = async (id) => {
  const complaint = await Complaint.findByPk(id);

  if (!complaint) {
    return null;
  }

  await complaint.destroy();

  return complaint;
};

const approve = async (id) => {
  const complaint = await Complaint.findByPk(id);

  if (!complaint) {
    return null;
  }
  await complaint.destroy();

  const complaints = await Complaint.findAll({
    where: {
      authorId: complaint.authorId,
    },
  });

  await Promise.all(
    complaints.map(async (c) => {
      await c.destroy();
    })
  );

  const news = await News.findAll({
    where: {
      authorId: complaint.authorId,
    },
  });

  await Promise.all(
    news.map(async (n) => {
      await n.destroy();
    })
  );

  const user = await User.findByPk(complaint.authorId);
  await user.destroy();

  return complaint;
};

module.exports = {
  getAll,
  create,
  remove,
  approve,
};
