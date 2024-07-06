const express = require('express');
const router = express.Router();
const cardsController = require('../controllers/cards');

router.post('/', cardsController.create);
router.get('/', cardsController.index);
router.get('/:id', cardsController.show);

module.exports = router;