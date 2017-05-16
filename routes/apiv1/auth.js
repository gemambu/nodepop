'use strict';


const express = require('express');
const router = express.Router();
const validate = require('../../lib/validateData');
const authenticate = require('../../lib/authentication');

const User = require('../../models/User');

/// POST /apiv1/usuarios/authenticate
router.post('/', (req, res, next) => {
    console.log(req.body);

    if(req.body.email === '' || !validate.isValidEmail(req.body.email) || req.body.key === ''){
        return res.status(500).json({success: false, error: 'Some parameter is not valid'});
    } else {
        // Buscar al usuario, si existe y la password es correcta        
        User.findOne({email: req.body.email}).exec((err, userFound) => {
            if(err){
                next(err); // le decimos a express que devuelva el error
                return;
            }

            // comprobar que la hash-key es igual a la introducida en req.body.key
            const authKey =  authenticate.getHash(req.body.key);

            if(authKey === userFound.key){
               // crear un token
                //var token = jwt.sign({id: userFound._id}, secret.jwt.secret, {expiresIn: '2days'});
                var token = authenticate.sign(userFound._id);
                res.json({success: true, result: {message: 'Login correct', userToken: token}}); 
            } else {
                return res.status(401).json({success: false, error: 'Password is not correct'});
            }
        });
    }
});

module.exports = router;