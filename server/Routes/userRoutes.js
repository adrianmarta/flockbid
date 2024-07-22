// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAdmin = require('../middleware/AdminMiddleware');

router.post('/register', userController.createUser);
router.get('/', userController.getUsers);
router.post('/login', userController.loginUser);

// Example of an admin-only route
router.get('/admin', isAdmin, (req, res) => {
    res.status(200).json({ message: 'Welcome, Admin!' });
});

module.exports = router;
