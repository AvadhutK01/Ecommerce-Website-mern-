const express = require('express');
const { registerUser, loginUser, logout, forgetPassword, resetPassword } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').get(logout);
userRouter.route('/pasword/forgot', forgetPassword);
userRouter.route('/password/reset/:token').put(resetPassword)


module.exports = userRouter;