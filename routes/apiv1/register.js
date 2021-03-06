'use strict';

const express = require('express');
const router = express.Router();
const validate = require('../../lib/validateData');
const authenticate = require('../../lib/authentication');
const customMessages = require('../../lib/customMessages');

const Usuario = require('../../models/Usuario');


// POST /apiv1/registro
router.post('/', (req, res, next) => {  
    console.log(req.body);

    if(req.body.name === undefined || req.body.name === '' ||
        req.body.email === undefined || req.body.email === '' || 
        !validate.isValidEmail(req.body.email) || 
        req.body.key === undefined || req.body.key === ''){

        var errorMessage = customMessages.getMessage(req.query.lang, 'PARAMETER_NOT_VALID');
        return res.status(403).json({success: false, message: errorMessage});
    } else {
        // creamos un objecto de tipo Usuario con la peticion mandada
        const usuario = new Usuario(req.body);
        usuario.key = authenticate.getHash(req.body.key);

        // lo guardamos en la BD
        usuario.save((err, nuevoUsuario) => {
            if (err){
                next(err);
                return;
            }
            var messageOK = customMessages.getMessage(req.query.lang, 'USER_SAVED_OK');
            res.status(200).json({success: true, result: { message: messageOK, username: nuevoUsuario.email}});
        });
    }
});

module.exports = router;