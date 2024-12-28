const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, profilePic } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                data: null,
                error: true,
                message: "Please enter all fields",
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                data: null,
                error: true,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User({
            name,
            email,
            password: hashedPassword,
            profilePic
        });

        newUser.save();

        res.status(201).json({
            data: newUser,
            message: "User created successfully",
        });

    }
    catch (error) {
        res.status(409).json({
            data: null,
            message: "Failed to create user",
            error: error.message
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                data: null,
                error: true,
                message: "Please enter all fields",
            });
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                data: null,
                error: true,
                message: "User does not exist",
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                data: null,
                error: true,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign({ _id: existingUser._id, email: existingUser.email }, process.env.SECRET_KEY);

        res.status(200).json({
            data: {
                user: {
                    _id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email,
                    profilePic: existingUser.profilePic,
                },
                token: token
            },
            message: "User logged in successfully",
        });
    }
    catch (error) {
        res.status(409).json({
            data: null,
            message: "Failed to login",
            error: error.message
        });
    }
}


const updateProfile = async (req, res) => {
    try {
        const { name, profilePic, bio, address, phone } = req.body;
        const { _id } = req.user
        const user = await User.findOneAndUpdate({ _id }, { name, profilePic, bio, address, phone }, { new: true });
        res.status(200).json({
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePic: user.profilePic,
                bio: user.bio,
                address: user.address,
                phone: user.phone
            },
            message: "User updated successfully",
        });
    }
    catch (error) {
        res.status(409).json({
            data: null,
            message: "Failed to update user",
            error: error.message
        });
    }

}

const fetchUser = async (req, res) => {
    try {
        const { _id } = req.user;
        const user = await User.findOne({ _id })
        res.status(200).json({
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePic: user.profilePic,
                bio: user.bio,
                address: user.address,
                phone: user.phone
            },
            message: "User fetched successfully",
        });
    }

    catch (error) {
        res.status(409).json({
            data: null,
            message: "Failed to fetch user",
            error: error.message
        });
    }

}
module.exports = {
    registerUser,
    loginUser,
    updateProfile,
    fetchUser
}