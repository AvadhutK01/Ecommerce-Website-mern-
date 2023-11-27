const express = require('express');
const { registerUser, loginUser, logout, forgetPassword, resetPassword, getUserDetails, updateUserPassword, updateUserDetails, getAllUser, updateUserRole, deleteUser } = require('../controllers/userController');
const userRouter = express.Router();
const { isAuth, authorizeRoles } = require('../middlewares/auth');
const { createReview, getProductReviews, deleteReview } = require('../controllers/productController');

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').get(logout);
userRouter.route('/pasword/forgot', forgetPassword);
userRouter.route('/password/reset/:token').put(resetPassword)
userRouter.route('/me').get(isAuth, getUserDetails)
userRouter.route('password/update').put(isAuth, updateUserPassword)
userRouter.route('password/profile').put(isAuth, updateUserDetails)
userRouter.route('/admin/users').get(isAuth, authorizeRoles('Admin'), getAllUser);
userRouter.route('/admin/user/:id').get(isAuth, authorizeRoles('Admin'), getSingleUser).put(isAuth, authorizeRoles('Admin'), updateUserRole).delete(isAuth, authorizeRoles('Admin'), deleteUser);
userRouter.route('/review').put(isAuth, createReview)
userRouter.route('/reviews').get(getProductReviews).delete(isAuth, deleteReview)
module.exports = userRouter;