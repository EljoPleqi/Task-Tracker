const multer = require('multer');
const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require('jsonwebtoken');

const { Users } = require('../models');

exports.createUser = async (req, res) => {
  try {
    const { password, verPassword, email } = req.body;

    console.log(req.body);

    if (password === verPassword) {
      bcrypt.hash(password, 10).then(
        async (hash) =>
          await Users.create({
            avatar: req.file.path,
            password: hash,
            userEmail: email,
          })
      );
    } else {
      res.json('passwords do not match');
    }
  } catch (error) {
    res.json(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findAll({ where: { email: email } });

    if (!user) res.json('User does not exist');
    // check if password is correct
    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) res.json({ error: 'Wrong password' });

      res.json(user);
    });
  } catch (error) {
    res.json(error);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'img/user-avatars');
  },
  filename: (req, file, cb) => {
    const uniqueFilename = Date.now() + '-' + path.extname(file.originalname);
    cb(null, uniqueFilename);
  },
});

// 2) Configure Mutler
exports.uploadAvatar = multer({
  storage: storage,
  limits: { fileSize: '5000000' },
  fileFilter: (req, file, cb) => {
    // set acceptable extension

    const fileTypes = /jpeg|jpg|png|gif|webp/;
    //check if file extention matches extension
    const extname = fileTypes.test(path.extname(file.originalname));
    //check if file mimetype matches extension
    const mimeType = fileTypes.test(file.mimetype);

    // check if everything is ok

    if (mimeType && extname) return cb(null, true);
    if (!mimeType || !extname)
      return cb(
        'File type not supported please upload a jpeg,jpg,png,gif or webp '
      );
  },
}).single('avatar');
