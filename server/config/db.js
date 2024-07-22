// config/db.js

const mongoose = require('mongoose');

// MongoDB URI
const uri = 'mongodb+srv://ioanmarta:kJrS8IDQjXLEt8JA@cluster0.phfbxfg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URI

// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

const db = mongoose.connection;

// Check connection
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Check for MongoDB connection error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
