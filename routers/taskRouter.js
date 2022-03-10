const express = require('express');
const { authUser } = require('../middleware/authUser');
const {
  getAllTasks,
  getSingelTaskById,
  createTask,
  uploadImage,
  deleteTask,
  markAsDone,
  getTasksByUserId,
} = require('../controllers/taskControllers');

const router = express.Router();

router.route('/').get(authUser, getTasksByUserId);
router
  .route('/:id')
  .get(getSingelTaskById)
  .patch(markAsDone)
  .delete(deleteTask);
router.route('/create').post(authUser, uploadImage, createTask);

module.exports = router;
