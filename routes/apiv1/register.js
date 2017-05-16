'use strict';

const express = require('express');
const router = express.Router();
const validate = require('../../lib/validateData');
const authenticate = require('../../lib/authentication');

const User = require('../../models/User');


// POST /apiv1/registro
router.post('/', (req, res, next) => {
  
    console.log(req.body);

    if(req.body.name === '' || !validate.isValidEmail(req.body.email) || req.body.key === ''){
        return res.status(500).json({success: false, error: 'Some parameter is not valid'});
    } else {
        // creamos un objecto de tipo Usuario con la peticion mandada
        const user = new User(req.body);
        //user.key = hash.sha512().update(req.body.key).digest('hex');
        user.key = authenticate.getHash(req.body.key);

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

module.exports = router;