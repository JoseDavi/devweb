const express = require('express');
const router = express.Router();

const userControler = require('../controllers/userController')

router.get('/', userControler.getAll);
router.post('/', userControler.create);

module.exports = router;