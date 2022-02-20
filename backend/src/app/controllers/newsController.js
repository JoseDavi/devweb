const newsService = require('../service/newsService');

const getAll = async (req, res) => {
  try {
    const news = await newsService.getAll(req.query);
  
    if (!news) {
      return res.status(404).json({ error: 'Nenhuma Noticia encontrada' });
    }
  
    return res.status(200).json({ news });
    
  } catch (error) {
    return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
  }
}

const create = async (req, res) => {
  try {
    const { title, msg, authorId, img } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Titulo é obrigatório' });
    }
    if (!msg) {
      return res.status(400).json({ error: 'Mensagem é obrigatória' });
    }
    if (!authorId) {
      return res.status(400).json({ error: 'Id do autor é obrigatório' });
    }

    const data = { title, msg, authorId, img };
    const news = await newsService.create(data);
  
    if (!news) {
      return res.status(400).json({ error: 'Noticia não foi criada' });
    }
  
    return res.status(201).json({ news });
    
  } catch (error) {
    return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
  }
}

const dislike = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: 'Id é obrigatório' });
    }

    const news = await newsService.dislike(id);
    return res.status(200).json({ news });

  } catch (error) {
    return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
  }
}

const like = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: 'Id é obrigatório' });
    }

    const news = await newsService.like(id);
    return res.status(200).json({ news });

  } catch (error) {
    return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
  }
}

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await newsService.remove(id);

    if (!news) {
      return res
        .status(404)
        .json({ error: 'A noticia não foi encontrada' });
    }

    return res.status(200).json({ news });

  } catch (error) {
    return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
  }
};

module.exports = {
  getAll,
  create,
  dislike,
  like,
  remove
};