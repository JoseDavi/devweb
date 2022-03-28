const complaintService = require("../service/complaintService");

const getAll = async (req, res) => {
  try {
    const complaints = await complaintService.getAll();

    if (!complaints) {
      return res.status(404).json({ error: "Nenhuma denuncia encontrada" });
    }

    return res.status(200).json({ complaints });
  } catch (error) {
    return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
  }
};

const create = async (req, res) => {
  try {
    const { newsId, msg, text, authorId } = req.body;

    if (!newsId) {
      return res.status(400).json({ error: "Id da noticia é obrigatório" });
    }
    if (!msg) {
      return res.status(400).json({ error: "Mensagem é obrigatória" });
    }
    if (!text) {
      return res.status(400).json({ error: "Texto é obrigatório" });
    }
    if (!authorId) {
      return res.status(400).json({ error: "Id do autor é obrigatório" });
    }

    const data = { newsId, msg, text, authorId };
    const complaint = await complaintService.create(data);

    if (!complaint) {
      return res.status(400).json({ error: "Denuncia não foi criada" });
    }

    return res.status(201).json({ complaint });
  } catch (error) {
    return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await complaintService.remove(id);

    if (!complaint) {
      return res.status(404).json({ error: "A denuncia não foi encontrada" });
    }

    return res.status(200).json({ complaint });
  } catch (error) {
    return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
  }
};

const approve = async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await complaintService.approve(id);

    if (!complaint) {
      return res.status(404).json({ error: "A denuncia não foi encontrada" });
    }

    return res.status(200).json({ complaint });
  } catch (error) {
    return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
  }
};

module.exports = {
  getAll,
  create,
  remove,
  approve,
};
