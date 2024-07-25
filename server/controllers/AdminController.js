const Flock = require('../models/flock');

exports.getBiddersData = async (req, res, next) => {
    try {
        const flocks = await Flock.find().populate('bids.user', 'username email');
        const flocksWithBids = flocks.map(flock => ({
            id: flock._id,
            name: flock.name,
            bids: flock.bids.map(bid => ({
                user: bid.user,
                amount: bid.amount,
                size: bid.size
            })).sort((a, b) => b.amount - a.amount) // Sort bids by amount in descending order
        }));
        res.status(200).json(flocksWithBids);
    } catch (error) {
        next(error);
    }
};
