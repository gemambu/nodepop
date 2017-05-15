'use strict';

var express = require('express');
var router = express.Router();
//const basicAuth = require('../../lib/basicAuth');


const User = require('../../models/User');

//router.use(basicAuth);

// POST /apiv1/registro
router.post('/', (req, res, next) => {
  
    console.log(req.body);

    //TODO: validate the info, check if everything is OK
    if(req.body.name === '' || req.body.email === '' || !isValidEmail(req.body.email) || req.body.key === ''){
        return res.status(500).json({success: false, error: 'Some parameter is not valid'});
    } else {
        // creamos un objecto de tipo Usuario con la peticion mandada
        const user = new User(req.body);

        // lo guardamos en la BD
        user.save((err, newUser) => {
            if (err){
                
                next(err);
                return;
            }
            res.json({success: true, result: newUser});
        });
    }
});

function isValidEmail(email){
    return /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);
}

module.exports = router;