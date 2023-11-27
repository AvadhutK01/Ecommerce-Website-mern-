const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: [true, "Please provide your address"]
        },
        city: {
            type: String,
            required: [true, "Please enter your city"]
        },
        state: {
            type: String,
            required: [true, "Please enter your state"]
        },
        country: {
            type: String,
            required: [true, "Please enter your country"]
        },
        pinCode: {
            type: Number,
            required: [true, "Please enter your pinCode"]
        },
        phoneNo: {
            type: Number,
            required: [true, "Please enter your phoneNo"]
        }
    },
    orderItems: [
        {
            name: { type: String },
            price: { type: Number },
            quantity: { type: Number },
            image: { type: String },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        required: true
    },
    paidAt: {
        type: Date,
        required: true
    },
    itemsPrice: {
        type: Number,
        default: 0,
        required: true
    },
    taxPrice: {
        type: Number,
        default: 0,
        required: true
    },
    shippingPrice: {
        type: Number,
        default: 0,
        required: true
    }, totalPrice: {
        type: Number,
        default: 0,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing"
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: new Date()
    }
})
module.exports = mongoose.model('Orders', orderSchema); 