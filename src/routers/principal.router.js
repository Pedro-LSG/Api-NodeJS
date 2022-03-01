const express = require('express');
const routers = express.Router();
const cursosRouter = require('./cursos.router');
const usuariosRouter = require('./usuarios.router');
const sessionsRouter = require('./sessions.router');

routers.use('/cursos', cursosRouter);
routers.use('/usuarios', usuariosRouter);
routers.use('/sessions', sessionsRouter);

module.exports = routers;

//npx knex --knexfile knexfile.js migrate:latest                         banco de dados