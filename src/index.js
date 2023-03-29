const server = require('./services/server');
const express = require("express");
const port = process.env.PORT || 3001;

server.listen(puerto, () =>{
console.log(`Servidor listo escuchando en el puerto ${puerto}`);
});

