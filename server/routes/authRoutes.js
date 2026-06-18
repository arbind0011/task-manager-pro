const router = require('express').Router();
const { register, login } = require('../controllers/authController'); // Adjust path as needed

// Map POST /register to the register controller
router.post('/register', register);

// Map POST /login to the login controller
router.post('/login', login);

module.exports = router;