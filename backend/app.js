const express = require('express');
const errorMiddleWare = require('./middlewares/error')
const app = express();
app.use(express.json());

//Route Imports
const productRouter = require('./routes/prouductRoutes');
app.use('/api/v1', productRouter)

//Middleware for Errors
app.use(errorMiddleWare)


module.exports = app;