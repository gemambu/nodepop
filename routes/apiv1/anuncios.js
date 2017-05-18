'use strict';

const express = require('express');
const router = express.Router();
const authenticate = require('../../lib/authentication');
const validate = require('../../lib/validateData');
const customMessages = require('../../lib/customMessages');

const Anuncio = require('../../models/Anuncio');

/* GET /apiv1/agentes */
router.get('/', (req, res, next) => {
    const token = req.query.token;
    if(!token){
        var errorMessage = customMessages.getError(req.query.lang, 'AUTH_TOKEN_NOT_INCLUDED');
        res.json({ok: false, error : {code: 401, message: errorMessage}});    
    } else {
        // check if token is correct
        authenticate.verify(token, req, res, completeSearch);
    }
});

function completeSearch(req, res){
    
    const name = req.query.nombre;
    const sale = req.query.venta;
    const price = req.query.precio;
    const tag = req.query.tag;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.start);
    const fields = (req.query.fields !== undefined) ? req.query.fields : {_id: 0, __v: 0};
    const sort = req.query.sort;
    const includeTotal = req.query.includeTotal ? req.query.includeTotal : 'true';

    // creamos el filtro vacio
    const filter = {};

    if(name){
        filter.name = new RegExp('^'+ name.toLowerCase(), 'i');
    }
    if(tag){
        filter.tags = tag.toLowerCase();
    }
    if(sale){
        filter.sale = sale.toLowerCase();
    }
    if(price){
        if(price.indexOf('-') === -1){ // the price filter is exact price
            filter.price = parseInt(price);
        }
        if(price.indexOf('-') === 0){ // the price filter is less than
            var limitLte = price.substring(1, price.length);
            filter.price = { '$lte': limitLte };
        }
        if(price.indexOf('-') === price.length -1){ // the price filter is greater than
            var limitGte = price.substring(0, price.length - 1);
            filter.price = { '$gte': limitGte };
        }
        if(price.indexOf('-') > 0 && price.indexOf('-') < price.length -1 ){ // the price filter has two limits
            var medium = price.indexOf('-');
            var limitGreater = price.substring(0, medium);
            var limitLess = price.substring(medium + 1, price.length);            
            filter.price = { '$gte': limitGreater , '$lte': limitLess  };
        }
    }

    var totalAnuncios = 0;
    var getCount = new Promise((resolve, reject) => {
        if(includeTotal.toLowerCase() === 'true'){
            Anuncio.count((err, countTotal) => {
                if(err){
                    res.json({success: false,  result: err});
                    reject();
                }
                totalAnuncios = countTotal;
            });
        }
    });

    getCount.then(
        Anuncio.list(filter, limit, skip, fields, sort, (err, anuncios) => {
            if(err){
                res.json({success: false,  error: {code: 500, message: err}});
                return;
            }
            if(includeTotal === 'true'){
                res.json({success: true, total: totalAnuncios, result: anuncios});
            } else {
                res.json({success: true, result: anuncios});    
            }

        })
    );    
}


// POST: añadir nuevo Anuncio
router.post('/nuevo', (req, res, next) => {
    console.log(req.body);

    //TODO: validate the info, check if everything is OK
    if(req.body.name === '' || 
        req.body.sale === '' || 
        req.body.price === ''|| 
        req.body.photo === ''|| 
        req.body.tags === '' || !validate.isValidTags(req.body.tags)){
        var errorMessage = customMessages.getError(req.query.lang, 'PARAMETER_NOT_VALID');
        return res.status(500).json({success: false, error: errorMessage});
    } else {
        const token = req.query.token;
        if(!token){
            var errorAuth = customMessages.getError(req.query.lang, 'AUTH_TOKEN_NOT_INCLUDED');
            res.status(401).json({success: false, message: errorAuth});    
        } else {
            // check if token is correct
            authenticate.verify(token, req, res, completeSave);
        }        
    }
});


function completeSave(req, res) {
    req.body.photo = '/images/anuncios/' + req.body.photo;
    req.body.tags = validate.removeSpaces(req.body.tags);

    // creamos un objecto de tipo Usuario con la peticion mandada
    const anuncio = new Anuncio(req.body);

    // lo guardamos en la BD
    anuncio.save((err, nuevoAnuncio) => {
        if (err){                    
            res.status(500).json({success: false,  message: err});
            return;
        }
        var messageOK = customMessages.getMessage(req.query.lang, 'NOTICE_SAVED_OK');
        res.json({success: true, message: messageOK, result: nuevoAnuncio});
    });    
}

module.exports = router;