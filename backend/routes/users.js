const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/', usersController.create);
router.post('/login', usersController.login);
router.post('/auth/google', usersController.googleLogin);

router.get('/check-token', ensureLoggedIn, usersController.checkToken);

module.exports = router;
