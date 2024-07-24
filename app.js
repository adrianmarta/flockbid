const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const flockRoutes = require('./routes/flockRoutes'); // Import the flock routes

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads directory

// Routes
app.use('/api/users', userRoutes);
app.use('/api/flocks', flockRoutes); // Use the flock routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
