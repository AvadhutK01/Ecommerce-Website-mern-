const ErrorHandler = require('../util/errorHandler');
const catchErrors = require('../middlewares/catchErrors');
const User = require('../models/userModel');
const sendToken = require('../util/jwtToken')
const sendEmail = require('../util/sendEmail.js');
const cloudinary = require('cloudinary');

//Register user
exports.registerUser = catchErrors(async (req, res, next) => {
    try {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: 'scale'
        })
        const { name, email, password } = req.body;

        const user = await User.create({
            name: name,
            email: email,
            password: password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        })

        sendToken(user, 201, res)
    }
    catch (Err) {
        console.log(Err);
    }
})

//Login user

exports.loginUser = catchErrors(async (req, res, next) => {
    try {

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
    } catch (error) {
        console.log(error);
    }

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

//get user details
exports.getUserDetails = catchErrors(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new ErrorHandler('No user found', 404))
        }
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
    }
})


exports.updateUserPassword = catchErrors(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('+password');
        if (!user) {
            return next(new ErrorHandler('No user found', 404))
        }
        const isPasswordMatched = user.comparePassword(req.body.oldPassword);
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Old password is incorrect", 403));
        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            return next(new ErrorHandler("New password and confirm password do not match", 401));
        }

        user.password = req.body.newPassword;
        await user.save();

        sendToken(user, 200, res);
    }
    catch (Err) {
        console.log(Err);
    }
})


//update user details
exports.updateUserDetails = catchErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);

        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
})

exports.getAllUser = catchErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`There is no user with id ${req.params.id}`, 404))
    }
    res.status(200).json({
        success: true,
        user
    })
})

exports.getSingleUser = catchErrors(async (req, res, next) => {
    const users = await User.find()
    res.status(200).json({
        success: true,
        users
    })
})

exports.updateUserRole = catchErrors(async (req, res, next) => {
    const Data = {
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.user.id, Data, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

exports.deleteUser = catchErrors(async (req, res, next) => {
    const user = await User.deleteOne({ _id: req.params.id });
    res.status(200).json({
        success: true,
        message: "Deleted Successfully"
    });
})