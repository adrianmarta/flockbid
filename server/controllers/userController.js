// controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res, next) => {
    const { username, email, password, isAdmin } = req.body;

    try {
        let existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            username,
            email,
            password,
            isAdmin: isAdmin || false,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        next(error);
    }
};

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        next(error);
    }
};
