// routes/flockRoutes.js
const express = require('express');
const router = express.Router();
const flockController = require('../controllers/flockController');
const isAdmin = require('../middleware/adminMiddleware');
const isAuthenticated = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // Import upload middleware

// CRUD operations for flocks
router.post('/', isAdmin, upload.array('images'), flockController.createFlock);
router.get('/', flockController.getAllFlocks);
router.get('/:id', flockController.getFlockById);

// Bidding operation
router.post('/:id/bid', isAuthenticated, flockController.placeBid);

module.exports = router;
