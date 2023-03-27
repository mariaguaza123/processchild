const express = require('express');
const app = express();
const mainRouter = require('../routes/index');
const compression = require('compression');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
//Se agrega la compresion Gzip para devolver la respuesta mas rapido
app.use(compression());


app.use('/api',mainRouter);

const CPUs = os.cpus().length;

module.exports = app;