'use strict';


const express = require('express');
const router = express.Router();
const validate = require('../../lib/validateData');
const secret = require('../../config/localConfig');
const jwt = require('jsonwebtoken');
const hash = require('hash.js');

//const basicAuth = require('../../lib/basicAuth');

const User = require('../../models/User');

//router.use(basicAuth);

/// POST /apiv1/usuarios/authenticate
router.post('/', (req, res, next) => {
    console.log(req.body);

    if(req.body.email === '' || !validate(req.body.email) || req.body.key === ''){
        return res.status(500).json({success: false, error: 'Some parameter is not valid'});
    } else {
        // Buscar al usuario, si existe y la password es correcta        
        User.findOne({email: req.body.email}).exec((err, userFound) => {
            if(err){
                next(err); // le decimos a express que devuelva el error
                return;
            }

            // comprobar que la hash-key es igual a la introducida en req.body.key
            const authKey =  hash.sha512().update(req.body.key).digest('hex');

            if(authKey === userFound.key){
               // crear un token
                var token = jwt.sign({id: userFound._id}, secret.jwt.secret, {expiresIn: '2days'});
                res.json({success: true, result: {message: 'Login correct', userToken: token}}); 
            } else {
                return res.status(401).json({success: false, error: 'Password is not correct'});
            }
        });
    }
});

module.exports = router;