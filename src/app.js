const express = require('express');
const app = express();
const cors = require('cors');
const favicon = require('express-favicon');
const logger = require('morgan');

const upload = require('./middleware/upload');



//user authentication
const authenticateUser = require('./middleware/authentication');

//routers
const mainRouter = require('./routes/mainRouter.js');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/products');
//const orderRouter = require('./routes/orders');


//error handler
const notFoundMiddleware = require('./middleware/not-found'); 
const errorHandlerMiddleware = require('./middleware/error-handler'); 

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/favicon.ico'));


// routes
app.use('/api/v1', mainRouter);
app.use('/api/v1/auth', authRouter); 
app.use('/api/v1/products', authenticateUser,  upload.single('productImage'),productRouter);
//app.use('/api/v1/orders', orderRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware); 

module.exports = app;

