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

//static model
// add save method
noticeSchema.statics.save = function(name, sale, price, photo, tags, callback){
    const query = Notice.save();
    query.name(name);
    query.sale(sale);
    query.price(price);
    query.photo(photo);
    query.tags(tags);

    query.exec(callback);
};

// Model
var Notice = mongoose.model('Notice', noticeSchema);

// Export the model
module.exports = Notice;