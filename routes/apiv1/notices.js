'use strict';

const express = require('express');
const router = express.Router();
const authenticate = require('../../lib/authentication');
const validate = require('../../lib/validateData');

const Notice = require('../../models/Notice');

/* GET /apiv1/agentes */
router.get('/', (req, res, next) => {

    const token = req.query.token;
    if(!token){
        res.json({success: false, result: 'This method needs authentication token'});    
    } else {
        // check if token is correct
        authenticate.verify(token, req, res);

        const name = req.query.nombre;
        const sale = req.query.venta;
        const price = req.query.precio;
        const tag = req.query.tag;
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.start);
        // TODO modificar la opcion de campos a mostrar
        //const fields = req.query.fields;
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
            console.log(price.indexOf('-'));
            console.log(price.length);
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
                var LimitGreater = price.substring(0, medium);
                var limitLess = price.substring(medium + 1, price.length);            
                filter.price = { '$gte': LimitGreater , '$lte': limitLess  };
            }
        }
    

        Notice.list(filter, limit, skip, {_id: 0, __v: 0}, sort, (err, notices) => {
            if(err){
                next(err); // le decimos a express que devuelva el error
                return;
            }
            if(includeTotal === 'true'){
                res.json({success: true, total: notices.length, result: notices});
            } else {
                res.json({success: true, result: notices});    
            }

        });

    }

    
});


// POST: add new notice
router.post('/nuevo', (req, res, next) => {
  console.log('llego aqui');
    console.log(req.body);

    //TODO: validate the info, check if everything is OK
    console.log('valid tags? ', validate.isValidTags(req.body.tags));
    if(req.body.name === '' || 
    req.body.sale === '' || 
    req.body.price === ''|| 
    req.body.photo === ''|| 
    req.body.tags === '' || 
    !validate.isValidTags(req.body.tags)){
        return res.status(500).json({success: false, error: 'Some parameter is not valid'});
    } else {

        const token = req.query.token;
        if(!token){
            res.json({success: false, result: 'This method needs authentication token'});    
        } else {
            // check if token is correct
            authenticate.verify(token, req);

            // comprobar si ya existe un anuncio con el mismo nombre


            req.body.photo = '/images/anuncios/' + req.body.photo;
            req.body.tags = validate.removeSpaces(req.body.tags);

            // creamos un objecto de tipo Usuario con la peticion mandada
            const notice = new Notice(req.body);

            // lo guardamos en la BD
            notice.save((err, newNotice) => {
                if (err){                    
                    next(err);
                    return;
                }
                res.json({success: true, result: newNotice});
            });
        }        
    }
});

module.exports = router;