const express = require('express');
const {
  createTask, getTasks, getTask, updateTask,
  deleteTask, deleteCompleted, toggleTask, getStats
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(protect);

router.route('/').post(createTask).get(getTasks);
router.get('/stats', getStats);
router.delete('/completed', deleteCompleted);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/toggle', toggleTask);

module.exports = router;
