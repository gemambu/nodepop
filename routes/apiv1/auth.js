'use strict';


var express = require('express');
var router = express.Router();
//const basicAuth = require('../../lib/basicAuth');

const User = require('../../models/User');

//router.use(basicAuth);

// GET /apiv1/usuarios/authenticate
router.get('/', (req, res, next) => {
  
    console.log(req.body);

    //TODO: validate the info, check if everything is OK
    if(req.body.email === '' || !isValidEmail(req.body.email) || req.body.key === ''){
        return res.status(500).json({success: false, error: 'Some parameter is not valid'});
    } else {
        const filter = {};
    if(req.body.email ){
        filter.email = req.body.email ;
    }


    User.list(filter, limit, skip, fields, sort, (err, users) => {
        if(err){
            next(err); // le decimos a express que devuelva el error
            return;
        }

        res.json({success: true, result: 'usuario válido'});

    });
    }
});

function isValidEmail(email){
    return /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);
}

module.exports = router;