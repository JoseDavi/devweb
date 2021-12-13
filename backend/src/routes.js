const express = require('express');
const router = express.Router();

const news = require('./app/routes/newsRouters')
const user = require('./app/routes/userRouters')

router.get('/', (req, res) => {
  res.send(`API rodando na porta ${process.env.BASE_URL || 3000}`);
});

router.use('/news', news);
router.use('/users', user);

module.exports = router;