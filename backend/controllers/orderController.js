const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../util/errorHandler');
const errorFunc = require('../middlewares/catchErrors');

exports.newOrder = errorFunc(async (req, res, next) => {

})
//create new order
exports.newOrder = errorFunc(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAT: Date.now(),
        user: req.user._id
    });
    res.status(201).json({
        success: true,
        order
    })
});

exports.getSingleOrder = errorFunc(async (req, res, next) => {
    const order = await Order.findById(req.param.id).populate('user', 'name email');
    if (!order) {
        return next(new ErrorHandler(`No order found with id ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        order
    })
})

exports.getUserOrder = errorFunc(async (req, res, next) => {
    const orders = await Order.find({ user: req.query.id });
    if (!orders) {
        return next(new ErrorHandler(`No order found with id ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        orders
    })
})

exports.getAllOrder = errorFunc(async (req, res, next) => {
    const orders = await Order.find();
    if (!orders) {
        return next(new ErrorHandler(`No order found with id ${req.params.id}`, 404));
    }
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

exports.updateOrderStatus = errorFunc(async (req, res, next) => {
    const order = await Order.find(req.params.id);
    if (!order) {
        return next(new ErrorHandler(`No order found with id ${req.params.id}`, 404));
    }
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("This order has already been delivered", 403));
    }

    order.orderItems.forEach(async o => {
        await updateStocks(o.product, o.quantity)
    });

    order.orderStatus = req.body.status;
    if (req.body.status === 'Delivered') {
        order.deliveredAt = Date.now()
    }
    await order.save({
        validateBeforeSave: false
    })
    res.status(200).json({
        success: true,
        message: 'Updated'
    })
})

exports.deleteOrder = errorFunc(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler(`No order found with id ${req.params.id}`, 404));
    }
    await order.remove()

    res.status(200).json({
        success: true,
        message: 'deleted'
    })
})

async function updateStocks(id, quantity) {
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({
        validateBeforeSave: false
    })
}