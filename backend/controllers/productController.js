const Product = require('../models/productModel');
const ErrorHandler = require('../util/errorHandler');
const errorFunc = require('../middlewares/catchErrors');
const ApiFeatures = require('../util/apiFeatures');


//Create Product--Admin
exports.createProduct = errorFunc(async (req, res) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}
)

//Get All Product
exports.getAllProducts = errorFunc(async (req, res) => {
    try {
        const resutlPerPage = 5;
        const productCount = await Product.countDocuments();
        const apiFeature = new ApiFeatures(Product.findOne(), req.query).search().filter().pagination(resutlPerPage);
        const products = await apiFeature.query;
        res.status(200).json({
            success: true,
            products,
            productCount
        });
    } catch (error) {
        console.log(error);
    }
})

//Get single Product
exports.getProductDetails = errorFunc(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    res.status(200).json({
        success: true,
        product
    })
})

//update Products --Admin
exports.updateProduct = errorFunc(async (req, res) => {

    let product = await Product.findById(req.params.id);
    if (!product) {
        if (!product) {
            return next(new ErrorHandler('Product not found', 404))
        }
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        product
    })
})

// Delete Product --admin
exports.deleteProduct = errorFunc(async (res, req) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        if (!product) {
            return next(new ErrorHandler('Product not found', 404))
        }
    }

    await product.remove()

    res.status(200).json({
        success: true,
        message: 'Product Deleted Successfully'
    })
})

//Create new review or update the review
exports.createReview = errorFunc(async (req, res) => {
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment
    }
    const product = await Product.findById(req.params.productId);
    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());
    if (isReviewed) {
        product.reviews.forEach((review) => {
            if (review.user.toString() === req.user._id.toString()) {
                review.rating = Number(req.body.rating);
                review.comment = req.body.comment;
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }
    let avg = 0;
    for (let i of product.reviews) {
        avg += i.rating;
    }
    product.ratings = (avg / product.reviews.length).toFixed(1);
    await product.save({
        validateBeforeSave: false
    });
    res.status(200).json({
        success: true,
        product
    })
})

exports.getProductReviews = errorFunc(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new ErrorResponse('No product found with that id', 404));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
});

exports.deleteReview = errorFunc(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.query.id);
    if (!product) {
        return next(new ErrorResponse("No product found", 404))
    }
    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.tosTring());
    let avg = 0;
    for (let i of reviews) {
        avg += i.rating;
    }
    const ratings = (avg / reviews.length).toFixed(1);

    const numOfReviews = reviews.length;

    await product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true
    })
})