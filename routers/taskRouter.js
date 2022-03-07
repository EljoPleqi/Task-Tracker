const express = require('express');
const {
  getAllTasks,
  getSingelTaskById,
  createTask,
  uploadImage,
  deleteTask,
  markAsDone,
} = require('../controllers/taskControllers');

const router = express.Router();

router.route('/').get(getAllTasks);
router
  .route('/:id')
  .get(getSingelTaskById)
  .patch(markAsDone)
  .delete(deleteTask);
router.route('/create').post(uploadImage, createTask);

module.exports = router;
