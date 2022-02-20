const express = require('express');
const router = express.Router();

const newsController = require('../controllers/newsController')

router.get('/', newsController.getAll);
router.post('/', newsController.create);
router.patch('/:id/dislike', newsController.dislike);
router.patch('/:id/like', newsController.like);
router.delete('/:id', newsController.remove)

module.exports = router;