const userService = require('../service/userService');

const getAll = async (req, res) => {
  try {
    const users = await userService.getAll();

    if (!users) {
      return res.status(404).json({ error: 'Nenhum usuário foi encontrado' });
    }
    
    return res.status(200).json({ users });

  } catch (error) {
    return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
  }
}

const create = async (req, res) => {
  const {
    name, email, password, reporter,
  } = req.body;

  if (!name || !email || !password || !reporter) {
    return res.status(400).json({ error: 'Informações insuficientes' });
  }

  const data = {name: name, email: email, password: password, reporter: reporter}
  const user = await userService.create(data);

  if (!user) {
    return res
      .status(400)
      .json({ error: 'Não foi possível criar o novo usuário' });
  }

  return res.status(201).json(user);
}

module.exports = {
  getAll,
  create
};