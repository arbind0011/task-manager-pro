const router = require('express').Router();
const { 
  createTask, 
  getTasks, 
  updateTask, 
  deleteTask 
} = require('../controllers/taskController'); // Adjust path as needed
const { protect } = require('../middleware/authMiddleware'); // Adjust path as needed

// Apply the protect middleware to ALL routes below this line
router.use(protect);

// Map POST / and GET / to create and read controllers
router.post('/', createTask);
router.get('/', getTasks);

// Map PUT /:id and DELETE /:id to update and delete controllers
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;