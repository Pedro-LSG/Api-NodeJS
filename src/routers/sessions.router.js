const express = require('express');
const routers = express.Router();
const bcrypt = require('bcryptjs');
const {celebrate, Joi} = require('celebrate');
const database = require('../database/connection');
const jwt = require('jsonwebtoken');

routers.post('/', 
    celebrate({
        body: Joi.object().keys({
            email: Joi.string().email().required(),
            senha: Joi.string().required()
        })
    }), async function(request, response){
        try{
            const {email, senha} = request.body;
            const usuario = await database('usuarios').where('email', email).first();
            const userExiste = await database('usuarios').where('email', email).first();
            if(!usuario){
                return response.status(401).json({mensagem: 'Credenciais inválidas.'});
            }
            const senhaCerta = await bcrypt.compare(senha, userExiste.senha);
            if(!senhaCerta){
                return response.status(401).json({mensagem: 'Credenciais inválidas.'});
            }

            const token = jwt.sign({
                codigo: usuario.codigo,
                nome: usuario.nome,
                email: usuario.email},
                'f53f97731a8a7d32c4b8a9e45ca8290b',
                {expiresIn: 120}
            )
            response.status(200).json(token);
        }
        catch(e){
            return response.status(400).json({Error: `${e}`})
        }        
});

module.exports = routers;