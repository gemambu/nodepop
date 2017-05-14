"use strict"

const mongoose = require('mongoose');

// Schema
const noticeSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    photo: String,
    tags:[String]
});

//static 
noticeSchema.statics.list = function(filter, limit, skip, fields, sort, callback) {
    const query = Notice.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields); // {nombreCampo: 1, campoquenoquiero: 0}
    query.sort(sort);

    query.exec(callback);
};

// Model
var Notice = mongoose.model('Notice', noticeSchema);

// Export the model
module.exports = Notice;