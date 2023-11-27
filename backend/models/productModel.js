const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter product Description"]
    },
    price: {
        type: Number,
        required: [true, 'Please Enter product Price'],
        maxLength: [8, "Price cannot exceed 8 characters"]
    },
    rating: {
        type: Number,
        default: 0
    },
    image: [{
        public_id: {
            type: String,
            required: true
        },
        Url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: [true, "Please Enter Product Category"]
    },
    Stock: {
        type: Number,
        required: [true, 'Please Enter product stocks'],
        maxLength: [4, "Stocks cannot exceed 4 characters"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('products', productSchema);