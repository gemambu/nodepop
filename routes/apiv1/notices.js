"use stric";

var express = require('express');
var router = express.Router();
//const basicAuth = require('../../lib/basicAuth');


const Notice = require('../../models/Notice');

//router.use(basicAuth);

/* GET /apiv1/agentes */
router.get('/', function(req, res, next) {
    
    const name = req.query.name;
    const sale = req.query.sale;
    const price = req.query.price;
    const photo = req.query.photo;
    const tags = req.query.tags;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const fields = req.query.fields;
    const sort = req.query.sort;


    // creamos el filtro vacio
    const filter = {};
    if(name){
        filter.name = name;
    }

    Notice.list(filter, limit, skip, fields, sort, (err, notices) => {
        if(err){
            next(err); // le decimos a express que devuelva el error
            return;
        }

        res.json({success: true, result: notices});

    });

});


// POST /apiv1/agentes
router.post('/', (req, res, next) => {
    console.log(req.body);

    //TODO: validate the info, check if everything is OK
    // Las validaciones de minimos y maximos, usar mongoose.

    // creamos un objecto de tipo Agente con la peticion mandada
    const agente = new Agente(req.body);

    // lo guardamos en la BD
    agente.save((err, agenteCreado) => {
        if (err){
            next(err);
            return;
        }
        res.json({success: true, result: agenteCreado});
    });



});

module.exports = router;