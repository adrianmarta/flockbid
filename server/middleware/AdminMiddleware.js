// middleware/adminMiddleware.js
const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        if (decoded.isAdmin) {
            req.user = decoded;
            next();
        } else {
            res.status(403).json({ message: 'Access denied' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = isAdmin;
