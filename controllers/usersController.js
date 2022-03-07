const multer = require('multer');
import { Users } from '../models/users';

exports.createUser = async((req, res) => {
  const { avatar, usernaname, password, email } = req.body;
  await Users.create({
    avatar: avatar,
    usernaname: usernaname,
    password: password,
    email: email,
  });

  res.json('REGISTRATION COMPLETED');
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/user-avatars');
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
