const express = require('express');
const router = express.Router();
const cardsController = require('../controllers/cards');

router.post('/', cardsController.addCard);
router.get('/:id', cardsController.show);
router.put('/:id', cardsController.update);

module.exports = router;