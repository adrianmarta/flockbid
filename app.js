const express = require('express');
const bodyParser = require('body-parser');
const db = require('./server/config/db');
const userRoutes = require('./server/routes/userRoutes');
const flockRoutes = require('./server/routes/flockRoutes');
const adminRoutes = require('./server/routes/adminRoutes'); // Import admin routes

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/flocks', flockRoutes);
app.use('/api/admin', adminRoutes); // Use the admin routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
