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
        var errorMessage = customMessages.getError(req.query.lang, 'PARAMETER_NOT_VALID');
        return res.status(500).json({success: false, error: errorMessage});
    } else {
        // Buscar al usuario, si existe y la password es correcta        
        Usuario.findOne({email: req.body.email}).exec((err, usuarioEncontrado) => {
            if(err){
                next(err); // le decimos a express que devuelva el error
                return;
            }

            // comprobar que la hash-key es igual a la introducida en req.body.key
            const authKey =  authenticate.getHash(req.body.key);
            if(authKey === usuarioEncontrado.key){
               // crear un token
                var tokenUsuario = authenticate.sign(usuarioEncontrado._id);
                var loginMessage = customMessages.getMessage(req.query.lang, 'LOGIN_OK');
                res.json({success: true, result: {message: loginMessage, token: tokenUsuario}}); 
            } else {
                 var loginError = customMessages.getMessage(req.query.lang, 'PASSWORD_NOT_OK');
                return res.status(401).json({success: false, error: loginError});
            }
        });
    }
});

module.exports = router;