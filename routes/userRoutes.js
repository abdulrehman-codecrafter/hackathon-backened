const express = require('express');
const { registerUser, loginUser, updateProfile, fetchUser } = require('../controllers/userControllers');
const authVerify = require('../middlewares/auth');
const userRouter = express.Router();


userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/me',authVerify, fetchUser);
userRouter.put('/updateProfile',authVerify, updateProfile);

module.exports = userRouter;