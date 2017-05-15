'use strict';

var express = require('express');
var router = express.Router();
//const basicAuth = require('../../lib/basicAuth');


const Notice = require('../../models/Notice');

//router.use(basicAuth);

/* GET /apiv1/agentes */
router.get('/', function(req, res, next) {
    console.log('query: ', req.query);
    //const name = req.query.name;
    const name = new RegExp('^'+ req.query.nombre, "i");
    const sale = req.query.venta;
    const price = req.query.precio;
    const photo = req.query.photo;
    const tag = req.query.tag;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const fields = req.query.fields;
    const sort = req.query.sort;


    // creamos el filtro vacio
    const filter = {};
    if(name){
        filter.name = name;
    }
    if(tag){
        filter.tags = tag.toLowerCase();
    }
    if(sale){
        filter.sale = sale.toLowerCase();
    }
    if(price){


        if(price.indexOf('-' === -1)){ // the price filter is exact price
            filter.price = parseInt(price);
        }
        if(price.indexOf('-') === 0 ){ // the price filter is less than
            var limitP = price.substring(1, price.length);
            filter.price = { '$lte': limitP };
        }
        if(price.indexOf('-' === price.length)){ // the price filter is greater than
            var limitP = price.substring(0, price.length - 1);
            filter.price = { '$gte': limitP };
        }
        if(price.indexOf('-') > 0 && price.indexOf('-') < price.length -1 ){ // the price filter has two limits
            var medium = price.indexOf('-');
            var LimitGreater = price.substring(0, medium);
            var limitLess = price.substring(medium + 1, price.length);            
            filter.price = { '$gte': LimitGreater , '$lte': limitLess  };
        }

        console.log(filter);

    }

    Notice.list(filter, limit, skip, fields, sort, (err, notices) => {
        if(err){
            next(err); // le decimos a express que devuelva el error
            return;
        }

        res.json({success: true, result: notices});

    });

});


// POST /apiv1/notices
router.post('/', (req, res, next) => {
    console.log(req.body);

    //TODO: validate the info, check if everything is OK
    // Las validaciones de minimos y maximos, usar mongoose.

    // creamos un objecto de tipo Agente con la peticion mandada
    const notice = new Notice(req.body);

    // lo guardamos en la BD
    notice.save((err, newNotice) => {
        if (err){
            next(err);
            return;
        }
        res.json({success: true, result: newNotice});
    });



});

module.exports = router;