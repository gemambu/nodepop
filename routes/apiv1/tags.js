'use strict';

const express = require('express');
const router = express.Router();
const authenticate = require('../../lib/authentication');
const customMessages = require('../../lib/customMessages');

const Anuncio = require('../../models/Anuncio');

// GET: /apiv1/tags: Obtenemos las etiquetas de la base de datos
router.get('/', (req, res, next) => {

    // This method needs authentication. Check token parameter
    const token = req.query.token;
    if(token === undefined){
        var error = customMessages.getError(req.query.lang, 'AUTH_TOKEN_NOT_INCLUDED');
        res.status(401).json({success: false, message: error});  
    }
    if(!token){
        var error = customMessages.getError(req.query.lang, 'AUTH_TOKEN_NOT_VALID');
        res.status(401).json({success: false, result: error});    
    } else {
        // check if token is correct
        authenticate.verify(token, req, res, completeSearch);
    }
});

function completeSearch(req, res){
    Anuncio.list({}, null,null, 'tags', null, (err, result) => {
        if(err){
            next(err); 
            return;
        }

        var tagsInDB = [];
        if(result && result.length > 0){
            for(var i = 0; i < result.length; i++){                
                var node = result[i].tags;
                node.forEach(function(currentValue) {
                    if(tagsInDB.indexOf(currentValue) === -1){ // add only if the tag is not in the array
                        tagsInDB.push(currentValue);
                    }
                });
            }
        }
        res.json({success: true, tags: tagsInDB});    
    });
}

module.exports = router;