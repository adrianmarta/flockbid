// controllers/flockController.js
const Flock = require('../models/flock');

exports.createFlock = async (req, res, next) => {
    const { name, origin, numberOfSheep, biddingEndDate, description, price } = req.body;
    const images = req.files.map(file => file.filename); // Get filenames from multer

    try {
        const newFlock = new Flock({
            name,
            origin,
            numberOfSheep,
            biddingEndDate,
            description,
            images,
            price
        });

        await newFlock.save();
        res.status(201).json({ message: 'Flock created successfully', flock: newFlock });
    } catch (error) {
        next(error);
    }
};

exports.getAllFlocks = async (req, res, next) => {
    try {
        const flocks = await Flock.find();
        res.status(200).json(flocks);
    } catch (error) {
        next(error);
    }
};

exports.getFlockById = async (req, res, next) => {
    try {
        const flock = await Flock.findById(req.params.id).populate('bids.user', 'username');
        if (!flock) {
            return res.status(404).json({ message: 'Flock not found' });
        }
        res.status(200).json(flock);
    } catch (error) {
        next(error);
    }
};

exports.placeBid = async (req, res, next) => {
    const { id } = req.params;
    const { userId, amount } = req.body;

    try {
        const flock = await Flock.findById(id);
        if (!flock) {
            return res.status(404).json({ message: 'Flock not found' });
        }

        if (new Date() > flock.biddingEndDate) {
            return res.status(400).json({ message: 'Bidding has ended for this flock' });
        }

        const existingBidIndex = flock.bids.findIndex(bid => bid.user.toString() === userId);
        if (existingBidIndex !== -1) {
            flock.bids[existingBidIndex].amount = amount;
        } else {
            flock.bids.push({ user: userId, amount });
        }

        await flock.save();
        res.status(200).json({ message: 'Bid placed successfully', flock });
    } catch (error) {
        next(error);
    }
};
