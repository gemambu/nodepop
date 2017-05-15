'use strict';

const express = require('express');
const router = express.Router();
const hash = require('hash.js');
const validate = require('../../lib/validateData');
//const basicAuth = require('../../lib/basicAuth');


const User = require('../../models/User');

//router.use(basicAuth);

// POST /apiv1/registro
router.post('/', (req, res, next) => {
  
    console.log(req.body);

    if(req.body.name === '' || req.body.email === '' || !validate(req.body.email) || req.body.key === ''){
        return res.status(500).json({success: false, error: 'Some parameter is not valid'});
    } else {
        // creamos un objecto de tipo Usuario con la peticion mandada
        const user = new User(req.body);
        user.key = hash.sha512().update(req.body.key).digest('hex');

        // lo guardamos en la BD
        user.save((err, newUser) => {
            if (err){
                next(err);
                return;
            }
            res.json({success: true, result: {message: 'User created successfully', username: newUser.email}});
        });
    }
});

function isValidEmail(email){
    return /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);
}

module.exports = router;