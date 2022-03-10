const express = require('express');
const { authUser } = require('../middleware/authUser');
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
router.route('/create').post(authUser, uploadImage, createTask);

module.exports = router;
