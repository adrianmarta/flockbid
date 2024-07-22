// models/flock.js
const mongoose = require('mongoose');

const flockSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    numberOfSheep: {
        type: Number,
        required: true
    },
    biddingEndDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String // Store the filename or path
    }],
    price: {
        type: Number,
        required: true
    },
    bids: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    }]
});

const Flock = mongoose.model('Flock', flockSchema);

module.exports = Flock;
