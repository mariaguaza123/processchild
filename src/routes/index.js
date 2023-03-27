const { Router } = require('express');
const productsRouter = require('./products');
const cartRouter = require('./cart');
const loggers = require('./loggers'); //Process child


const routerMain = Router();
routerMain.use('/products', productsRouter);
routerMain.use('/cart', cartRouter);
routerMain.use('/logger', loggersRoute);

module.exports = routerMain;