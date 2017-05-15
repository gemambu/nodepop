'use strict';

var express = require('express');
var router = express.Router();
//const basicAuth = require('../../lib/basicAuth');


const Notice = require('../../models/Notice');

//router.use(basicAuth);

/* GET /apiv1/agentes */
router.get('/', (req, res, next) => {
    const name = req.query.nombre;
    const sale = req.query.venta;
    const price = req.query.precio;
    const tag = req.query.tag;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.start);
    const fields = req.query.fields;
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
    console.log(filter);

    Notice.list(filter, limit, skip, fields, sort, (err, notices) => {
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
});


// POST: add new notice
router.post('/nuevo', (req, res, next) => {
  
    console.log(req.body);

    //TODO: validate the info, check if everything is OK
    if(req.body.name === '' 
    || req.body.sale === '' 
    || req.body.price === ''
    || req.body.photo === ''
    || req.body.tags === ''){
        return res.status(500).json({success: false, error: 'Some parameter is not valid'});
    } else {

        req.body.photo = '/images/anuncios/' + req.body.photo;
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
});

function isValidEmail(email){
    return /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);
}


module.exports = router;