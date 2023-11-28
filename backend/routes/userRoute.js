const express = require('express');
const { registerUser, loginUser, logout, forgetPassword, resetPassword, getUserDetails, updateUserPassword, updateUserDetails, getAllUser, updateUserRole, deleteUser, getSingleUser } = require('../controllers/userController');
const userRouter = express.Router();
const { isAuthUser, authorizeRoles } = require('../middlewares/auth');
const { createReview, getProductReviews, deleteReview } = require('../controllers/productController');

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').get(logout);
userRouter.route('/pasword/forgot', forgetPassword);
userRouter.route('/password/reset/:token').put(resetPassword)
userRouter.route('/me').get(isAuthUser, getUserDetails)
userRouter.route('password/update').put(isAuthUser, updateUserPassword)
userRouter.route('password/profile').put(isAuthUser, updateUserDetails)
userRouter.route('/admin/users').get(isAuthUser, authorizeRoles('Admin'), getAllUser);
userRouter.route('/admin/user/:id').get(isAuthUser, authorizeRoles('Admin'), getSingleUser).put(isAuthUser, authorizeRoles('Admin'), updateUserRole).delete(isAuthUser, authorizeRoles('Admin'), deleteUser);
userRouter.route('/review').put(isAuthUser, createReview)
userRouter.route('/reviews').get(getProductReviews).delete(isAuthUser, deleteReview)
module.exports = userRouter;