'use strict';

var express = require('express');
var router = express.Router();

const Notice = require('../../models/Notice');

// GET: /apiv1/tags: Get all the tags from database
router.get('/', function(req, res, next) {
    Notice.list({}, null,null, 'tags', null, (err, result) => {
        if(err){
            next(err); // le decimos a express que devuelva el error
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
});

module.exports = router;