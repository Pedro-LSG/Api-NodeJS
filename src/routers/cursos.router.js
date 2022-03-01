const { celebrate, Joi } = require('celebrate');
const express = require('express');
const routers = express.Router();
const { uuid } = require('uuidv4');
const database = require('../database/connection');
const curso = require('../model/curso');
const tokenValidation = require('../middleware/tokenValidation');

routers.use(tokenValidation);

routers.post('/', 
    celebrate({
        body: Joi.object().keys({
            nome: Joi.string().max(25).required(),
            area: Joi.string().max(25).required(),
            dataInicio: Joi.string().max(10).required(),
            dataTermino: Joi.string().max(10).required(),
            preRequisito: Joi.string().max(25).required()
        })
    }), async function(request, response){
    try{
        const {nome, area, dataInicio, dataTermino, preRequisito} = request.body;
        const novoCurso = new curso(uuid(), nome, area, dataInicio, dataTermino, preRequisito);
        await database('cursos').insert(novoCurso);
        response.status(201).json();
    }
    catch(e){
        return response.status(400).json({Error: `${e}`});
    }    
});

routers.get('/', async function(request, response){
    try{
        const lstCursos = await database('cursos');
        response.status(200).json(lstCursos);
    }
    catch(e){
        return response.status(400).json({Error: `${e}`});
    }
});

routers.get('/:codigo', async function(request, response){
    try{
        const {codigo} = request.params;
        const curso = await database('cursos').where('codigo', codigo).first();
        if(!curso){
            return response.status(400).json({
                error: 'Codigo: ' + codigo + ' não encontrado.' 
            });
        }
        response.status(200).json(curso);
    }
    catch(e){
        return response.status(400).json({Error: `${e}`});
    }   
});

routers.put('/:codigo', 
    celebrate({
        body: Joi.object().keys({
            nome: Joi.string().max(25).required(),
            area: Joi.string().max(25).required(),
            dataInicio: Joi.string().max(10).required(),
            dataTermino: Joi.string().max(10).required(),
            preRequisito: Joi.string().max(25).required()
        })
    }), async function(request, response){    
        const {codigo} = request.params;
        const curso = await database('cursos').where('codigo', codigo).first();
        if(!curso){
            return response.status(400).json({
                error: 'Codigo: ' + codigo + ' não encontrado.' 
            });
        }
        try{
            const {nome, area, dataInicio, dataTermino, preRequisito} = request.body;
            const cursoAtualizado = {
                codigo, nome, area, dataInicio, dataTermino, preRequisito
            }
            await database('cursos').where('codigo', codigo).update(cursoAtualizado);
            response.status(200).json(cursoAtualizado);
        }
        catch(e){
            return response.status(400).json({Error: `${e}`});
        }
});

routers.delete('/:codigo', async function(request, response){
    try{
        const {codigo} = request.params;
        await database('cursos').where('codigo', codigo).delete();
        response.status(204).json();
    }
    catch(e){
        return response.status(400).json({Error: `${e}`});
    }
});

module.exports = routers;