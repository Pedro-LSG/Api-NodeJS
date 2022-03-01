const express = require('express');
const routers = require('./routers/principal.router');
const {errors} = require('celebrate');
const { application } = require('express');

const app = express();
app.use(express.json()) ;
app.use(routers);
app.use(errors());

app.listen(3000, () => {
    console.log('api em execução na porta 3000...');
 });