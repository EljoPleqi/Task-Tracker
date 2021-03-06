const multer = require('multer');
const { Tasks, sequelize } = require('../models');
const path = require('path');
const { c } = require('docker/src/languages');

// create new tasks

exports.createTask = async (req, res) => {
  const { title, importance, duration, UserId } = req.body;

  await Tasks.create({
    title: title,
    image: req.file.path,
    duration: duration,
    importance: importance,
    UserId: UserId,
  });

  res.json('task listed');
};
// Upload image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './img/tasks');
  },
  filename: (req, file, cb) => {
    const uniqueFilename = Date.now() + '-' + path.extname(file.originalname);
    cb(null, uniqueFilename);
  },
});

exports.uploadImage = multer({
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
}).single('image');

// get all tasks
exports.getAllTasks = async (req, res) => {
  // add code to get userID later
  const tasks = await Tasks.findAll();

  res.json(tasks);
};

exports.getTasksByUserId = async (req, res) => {
  const { id } = req.body;
  const currentDate = new Date().getDate();
  console.log(currentDate);

  const allTasks = await Tasks.findAll({ where: { UserId: id }, raw: true });

  const tasks = allTasks.filter(
    (task) => task.createdAt.getDate() >= currentDate
  );

  res.json(tasks);
};
// get single task
exports.getSingelTaskById = async (req, res) => {
  const id = req.body.params;
  const task = Tasks.findOne({ where: { id: id } });
  res.json(task);
};

// CODE FOR TASK UPDATE
exports.markAsDone = async (req, res) => {
  const { id } = req.params;

  Tasks.update({ status: true }, { where: { id: id } });
  res.json('TASK COMPLETED');
};

// - CHANGE TASK INFO

// - MARK TASK AS COMPLETE

// CODE FOR TASK DELETION
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  const task = await Tasks.findByPk(id);

  task.destroy();

  res.json('TASK DELETED SUCCESSFULLY');
};
