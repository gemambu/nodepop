'use strict';

const hash = require('hash.js');
const secret = require('../config/localConfig');
const jwt = require('jsonwebtoken');
const customMessages = require('./customMessages');

function getHash(data){
    return hash.sha512().update(data).digest('hex');
}

function sign(user_id){
    return jwt.sign({id: user_id}, secret.jwt.secret, {expiresIn: '2days'});
}

function verify(token, req, res, callback) {
    jwt.verify(token, secret.jwt.secret, function(err) {
        if (err) {
            var error = customMessages.getMessage(req.query.lang, 'AUTH_TOKEN_NOT_VALID');
            return res.status(401).json({ success: false, message: error});
        }
        callback(req, res);
    });
}

module.exports.getHash = getHash;
module.exports.sign = sign;
module.exports.verify = verify;


