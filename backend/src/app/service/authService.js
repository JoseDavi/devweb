const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateToken = (params = {}) => jwt.sign(params, "secretInDotENV", {
  expiresIn: 5086400,
});

const authenticate = async (data) => {
  try {
    const { email, password } = data;

    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'name', 'email', 'reporter', 'passwordHash'],
    });

    if (!user) {
      throw new Error('Usuário passado não encontrado');
    }

    if (!(await bcrypt.compare(password, user.dataValues.passwordHash))) {
      throw new Error('Senha incorreta');
    }

    delete user.dataValues.passwordHash;

    return {
      user,
      token: generateToken({ id: user.id, email: user.email }),
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  authenticate,
  generateToken
};
