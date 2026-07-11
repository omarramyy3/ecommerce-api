require('dotenv').config();
const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const AppError = require('./utils/AppError');
const errorHandler = require('./middleware/errorHandler');

const categoryRouter = require('./routes/categoryRoutes');
const productRouter = require('./routes/productRoutes'); 
const cartRouter = require('./routes/cartRoutes');       
const orderRouter = require('./routes/orderRoutes');

const app = express();

app.use(express.json());
app.use(mongoSanitize());

app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter); 
app.use('/api/cart', cartRouter);       
app.use('/api/orders', orderRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

module.exports = app;