const express = require('express');
const router = express.Router();
const listsController = require('../controllers/lists');

router.post('/', listsController.create);
router.get('/', listsController.index);
router.delete('/:id', listsController.delete);

module.exports = router;