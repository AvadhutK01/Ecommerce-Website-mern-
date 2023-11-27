const ErrorHandler = require('../util/errorHandler');
const catchErrors = require('../middlewares/catchErrors');
const User = require('../models/userModel');
const sendToken = require('../util/jwtToken')
const sendEmail = require('../util/sendEmail.js');

//Register user
exports.registerUser = catchErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name: name,
        email: email,
        password: password,
        avatar: {
            public_id: 'no-image',
            url: 'https://res.cloudinary.com/dqvjgxzlk/image/upload/v157'
        }
    })

    sendToken(user, 201, res)
})

//Login user

exports.loginUser = catchErrors(async (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please provide an email and a password", 400))
    }

    const user = await User.findOne({ email: email }).select('+password');

    if (!user) {
        return next(new ErrorHandler("Invalid credentials", 403));
    }
    const isPasswordMatched = user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid credentials", 403));
    }

    sendToken(user, 200, res)

})

//logout user
exports.logout = catchErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

//forget password

exports.forgetPassword = catchErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler(`No account associated with ${req.body.email}`, 404))
    }

    //get resetpassword token

    const resetToken = user.getResetPasswordToke();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Password Reset Token",
            message
        })
        res.status(200).json({
            success: true,
            message: "Check your email for the link to reset your password."
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});

//Reset Password
exports.resetPassword = catchErrors(async (req, res, next) => {
    //Get hashed token from url
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });
    if (!user) {
        return next(new ErrorHandler("Invalid or expired token.", 400))
    }

    if (req.body.password !== req.body.confirmPassoword) {
        return next(new ErrorHandler("Password and confirm password do not match.", 400))
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
}
)
