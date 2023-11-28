const express = require('express');
const errorMiddleWare = require('./middlewares/error');
const cookieParser = require('cookie-parser')
const app = express();
app.use(express.json());
app.use(cookieParser());

//Route Imports
const productRouter = require('./routes/prouductRoutes');
const userRouter = require('./routes/userRoute');
const orderRouter = require('./routes/orderRoute');
app.use('/api/v1', productRouter)
app.use('/api/v1', userRouter);
app.use('/api/v1', orderRouter);

//Middleware for Errors
app.use(errorMiddleWare)


module.exports = app;