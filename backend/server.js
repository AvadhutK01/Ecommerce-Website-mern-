const app = require("./app");
const dotenv = require('dotenv');
const connectDatabase = require("./config/database");
dotenv.config();

//connecting to database

connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})