const express = require('express');

const {
  createUser,
  uploadAvatar,
  login,
} = require('../controllers/usersController');

const router = express.Router();

router.route('/singup').post(uploadAvatar, createUser);
router.route('/login').post(login);

module.exports = router;
