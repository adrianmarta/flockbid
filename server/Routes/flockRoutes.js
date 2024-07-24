const express = require('express');
const router = express.Router();
const flockController = require('../controllers/flockController');
const isAdmin = require('../middleware/adminMiddleware');
const upload = require('../middleware/uploadMiddleware'); // Import upload middleware
const isAuthenticated = require('../middleware/authMiddleware');

// CRUD operations for flocks
router.post('/', isAdmin, upload.array('images'), flockController.createFlock);
router.get('/', flockController.getAllFlocks);
router.get('/:id', flockController.getFlockById); // Get specific flock details

// Bidding operation
router.post('/:id/bid', isAuthenticated, flockController.placeBid);

module.exports = router;
