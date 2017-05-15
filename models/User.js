'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    key: String
});
userSchema.index({email: 'text'});

// método save estático
userSchema.statics.save = function(name, email, key, callback){
    console.log('llego al save');
    const query = User.save();
    query.name(name);
    query.email(email);
    query.key(key);

    query.exec(callback);
};

var User = mongoose.model('User', userSchema);

module.exports = User;