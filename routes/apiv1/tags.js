'use strict';

const express = require('express');
const router = express.Router();
const authenticate = require('../../lib/authentication');
const customMessages = require('../../lib/customMessages');

const Anuncio = require('../../models/Anuncio');

// GET: /apiv1/tags
router.get('/', (req, res, next) => {


    const token = req.query.token;
    if(token === undefined){
        var errorUndefined = customMessages.getMessage(req.query.lang, 'AUTH_TOKEN_NOT_INCLUDED');
        res.json({success: false, message: errorUndefined});  
        return;
    }
    if(!token){
        var errorToken = customMessages.getMessage(req.query.lang, 'AUTH_TOKEN_NOT_VALID');
        res.json({success: false, result: errorToken});    
    } else {
        // check if token is correct
        authenticate.verify(token, req, res, completeSearch);
    }
});

function completeSearch(req, res){
    Anuncio.list({}, null,null, 'tags', null, (err, result) => {
        if(err){
            res.status(500).json({success: false,  message: err});
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
        res.status(200).json({success: true, tags: tagsInDB});    
    });
}

module.exports = router;