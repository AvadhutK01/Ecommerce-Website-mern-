const express = require('express');
const orderRouter = express.Router();
const { isAuth, authorizeRoles } = require('../middlewares/auth');
const { newOrder, getSingleOrder, getUserOrder, getAllOrder, updateOrderStatus, deleteOrder } = require('../controllers/orderController');

orderRouter.route('/order/new').post(isAuth, newOrder);
orderRouter.route('/order/:id').get(isAuth, authorizeRoles('admin'), getSingleOrder);
orderRouter.route('/order/me').get(isAuth, getUserOrder);
orderRouter.route('/admin/orders').get(isAuth, authorizeRoles('admin'), getAllOrder);
orderRouter.route('/admin/order/:id').put(isAuth, authorizeRoles('admin'), updateOrderStatus).delete(isAuth, authorizeRoles('admin'), deleteOrder)

module.exports = orderRouter;