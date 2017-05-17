'use strict';

const mongoose = require('mongoose');

// Schema
const anuncioSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    photo: String,
    tags:[String]
});
anuncioSchema.index({name: 'text', price: 1, tags: "text"});

//static 
anuncioSchema.statics.list = function(filter, limit, skip, fields, sort, callback) {
    const query = Anuncio.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields); // {nombreCampo: 1, campoquenoquiero: 0}
    query.sort(sort);
    query.exec(callback);
};

// Model
var Anuncio = mongoose.model('Anuncio', anuncioSchema);

// Export the model
module.exports = Anuncio;