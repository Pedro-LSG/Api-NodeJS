const jwt = require('jsonwebtoken');

function tokenValidation(request, response, next){
    try{
        var tokenEnviado = request.headers.authorization;
        if(tokenEnviado == undefined){
            return response.status(401).json({mensagem: 'Token não informado.'});
        }
        tokenEnviado = tokenEnviado.substring(7, tokenEnviado.length);
        jwt.verify(tokenEnviado, 'f53f97731a8a7d32c4b8a9e45ca8290b');
    }
    catch(error){
        return response.status(401).json({mensagem: 'Token inválido.'})
    }
    return next();
}

module.exports = tokenValidation;