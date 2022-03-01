const { celebrate, Joi } = require('celebrate');
const express = require('express');
const routers = express.Router();
const { uuid } = require('uuidv4');
const database = require('../database/connection'); 
const usuario = require('../model/usuario');
const senhaForteRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const bcrypt = require('bcryptjs');

routers.post('/', 
    celebrate({
        body: Joi.object().keys({
            nome: Joi.string().max(40).required(),
            email: Joi.string().max(80).required(),
            senha: Joi.string().max(15).regex(senhaForteRegex).required()
        })
    }), async function(request, response){
    try{
        const {nome, email, senha} = request.body;
        const senhaCriptografada = await bcrypt.hash(senha, 8);
        const novoUsuario = new usuario(uuid(), nome, email, senhaCriptografada, true)
        await database('usuarios').insert(novoUsuario);
        response.status(201).json();
    }
    catch(e){
        return response.status(400).json({Error: `${e}`});
    }
});

routers.get('/', async function(request, response){
    try{
        const lstUsuario = await database('usuarios');
        response.status(200).json(lstUsuario);
    }
    catch(e){
        return response.status(400).json({Error: `${e}`});
    }    
});

routers.get('/:codigo', async function(request, response){
    try{
        const {codigo} = request.params;
        const usuario = await database('usuarios').where('codigo', codigo).first();
        if(!usuario){
            return response.status(400).json({
                error: 'Codigo:' + codigo + 'não encontrado.' 
            });
        }
        response.status(200).json(usuario);
    }
    catch(e){
        return response.status(400).json({Error: `${e}`});
    }    
});

routers.put('/:codigo', 
    celebrate({
        body: Joi.object().keys({
            nome: Joi.string().max(40).required(),
            email: Joi.string().max(80).required()
        })
    }), async function(request, response){  
    try{
        const {codigo} = request.params;
        const usuarioExist = await database('usuarios').where('codigo', codigo).first();
        if(!usuarioExist){
            return response.status(400).json({
                error: 'Codigo: ' + codigo + ' não encontrado.' 
            });
        }
        const {nome, email} = request.body;
        const usuarioA = {
            codigo: uuid(), nome, email
        }
        await database('usuarios').where('codigo', codigo).update(usuarioA);
        response.status(200).json(usuarioA);
    }  
    catch(e){
        return response.status(400).json({Error: `${e}`});
    }    
});

routers.delete('/:codigo', async function(request, response){
    try{
        const {codigo} = request.params;
        await database('usuarios').where('codigo', codigo).delete();
        response.status(204).json();
    }
    catch(e){
        return response.status(400).json({Error: `${e}`});
    }
});

module.exports = routers;