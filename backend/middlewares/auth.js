const ErrorHandler = require('../util/errorHandler');
const catchError = require('./catchErrors')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const isAuthUser = catchError(async (req, res, next) => {

    const token = req.cookie;
    if (!token) {
        new ErrorHandler('Please Login to access this resource', 401);
    }

    const decodedData = jwt.verify(token, process.env.SECRET);

    req.user = await User.findById(decodedData.id);

    next();
})

exports.authorizeRoles = (...roles) => {
    return function (req, res, next) {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role:${req.user.role} is not allowed to access this resource`, 403))
        }
        next();
    }
}