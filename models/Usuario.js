'use strict';

const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    name: String,
    email: String,
    key: String
});
usuarioSchema.index({email: 'text'});

// método save estático
usuarioSchema.statics.save = function(name, email, key, callback){
    console.log('llego al save');
    const query = Usuario.save();
    query.name(name);
    query.email(email);
    query.key(key);

    query.exec(callback);
};

//static 
usuarioSchema.statics.list = function(filter, callback) {
    const query = Usuario.find(filter);
    query.select({_id: 0, __v: 0});
    query.exec(callback);
};

var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;