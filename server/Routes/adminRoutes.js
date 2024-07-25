const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');
const isAdmin = require('../middleware/adminMiddleware');

router.get('/bidders', isAdmin, adminController.getBiddersData);

module.exports = router;
