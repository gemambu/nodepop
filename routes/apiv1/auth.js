'use strict';


const express = require('express');
const router = express.Router();
const validate = require('../../lib/validateData');
const authenticate = require('../../lib/authentication');
const customMessages = require('../../lib/customMessages');

const Usuario = require('../../models/Usuario');

/// POST /apiv1/usuarios/authenticate
router.post('/', (req, res, next) => {
    console.log(req.body);

    if(req.body.email === '' || req.body.email === undefined || 
    !validate.isValidEmail(req.body.email) || 
    req.body.key === undefined || req.body.key === ''){
        var errorMessage = customMessages.getMessage(req.query.lang, 'PARAMETER_NOT_VALID');
        return res.status(403).json({success: false, error: errorMessage});
    } else {
        // Buscar al usuario, si existe y la password es correcta        
        Usuario.findOne({email: req.body.email}).exec((err, usuarioEncontrado) => {
            if(err){
                next(err); // le decimos a express que devuelva el error
                return;
            }

            // comprobar que la hash-key es igual a la introducida en req.body.key

            if(usuarioEncontrado === undefined || usuarioEncontrado == undefined  || usuarioEncontrado === '' 
            || usuarioEncontrado.key == undefined || usuarioEncontrado.key === undefined){
                var userError = customMessages.getMessage(req.query.lang, 'USER_NOT_FOUND');
                return res.status(401).json({success: false, error: userError});
            } else {
                const authKey =  authenticate.getHash(req.body.key);
                if(authKey === usuarioEncontrado.key){
                // crear un token
                    var tokenUsuario = authenticate.sign(usuarioEncontrado._id);
                    var loginMessage = customMessages.getMessage(req.query.lang, 'LOGIN_OK');
                    res.status(200).json({success: true, result: {message: loginMessage, token: tokenUsuario}}); 
                } else {
                    var loginError = customMessages.getMessage(req.query.lang, 'PASSWORD_NOT_OK');
                    return res.status(401).json({success: false, error: loginError});
                }
            }

            
        });
    }
});

module.exports = router;