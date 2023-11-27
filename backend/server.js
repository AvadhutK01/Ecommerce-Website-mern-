const app = require("./app");
const dotenv = require('dotenv');
const connectDatabase = require("./config/database");
dotenv.config();

//handling uncaught exception
process.on('uncaughtException', (err) => {
    console.log(`Uncaught Exception: ${err}`);
    process.exit(1)
})

//connecting to database

connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

//unhandled promise rejection 
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`)
    server.close(() => process.exit(1));
});
