'use strict';

const hash = require('hash.js');
const secret = require('../config/localConfig');
const jwt = require('jsonwebtoken');
const customMessages = require('./customMessages');

function getHash(data){
    return hash.sha512().update(data).digest('hex');
}

function sign(user_id){
    jwt.sign({id: user_id}, secret.jwt.secret, {expiresIn: '2days'});
}

function verify(token, req, res, callback) {
    jwt.verify(token, secret.jwt.secret, function(err, decoded) {
        if (err) {
            var error = customMessages.getError(req.query.lang, 'failAuthenticatingToken');
            return res.json({ ok: false, error: {code: 401, message: error}});
        } 
        //else {
            // if everything is good, save to request for use in other routes
          //  req.decoded = decoded;
        callback(req, res);
        //}

    });
}


module.exports.getHash = getHash;
module.exports.sign = sign;
module.exports.verify = verify;


