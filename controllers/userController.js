const asyncHandler = require('express-async-handler');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//Register user logic
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400);
        throw new Error("user already registered")
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('Hashed password:', hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    console.log(`User registered successfully: ${user}`)
    if (user) {
        res.status(201).json({_id: user.id, email: user.email});
    } else {
        res.status(400);
        throw new Error('Invalid user credential!!');
    }
    res.json({message: 'User registered'});
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: '10m' } // Corrected the key
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(400);
        throw new Error("Please check your email or password!");
    }
});

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
})

module.exports = {
    registerUser,
    loginUser,
    currentUser
};