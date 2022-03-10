const express = require('express');
const { authUser } = require('../middleware/authUser');
const {
  getUser,
  createUser,
  uploadAvatar,
  login,
} = require('../controllers/usersController');

const router = express.Router();

router.route('/').get(authUser, getUser);
router.route('/singup').post(uploadAvatar, createUser);
router.route('/login').post(login);

module.exports = router;
