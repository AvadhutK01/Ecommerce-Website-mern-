const { default: mongoose } = require("mongoose");


const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("Mongodb connected");
    });
}

module.exports = connectDatabase