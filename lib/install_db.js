"use strict";

const mongoose = require('mongoose');
const conn = mongoose.connection;


// Indicamos que libreria de promesas que vamos a utilizar
mongoose.Promise= global.Promise;

conn.on('error', err => {
    console.log('Error de conexion', err);
    process.exit(1);
});

conn.once('open', () => {
    console.log('Conectado a mongodb');

    if(conn.collections.length > 0){
         // remove all the tables created
        mongoose.connection.db.dropCollection('notices', (err, result) => {
            if(err){
                console.log('Error removing collection notices');
                return;
            }
            console.log('Collection notices removed successfully');
        });

        mongoose.connection.db.dropCollection('users', (err, result) => {
            if(err){
                console.log('Error removing collection users');
                return
            }
            console.log('Collection users removed successfully');
        });
    }

    //trying to get collection names

});

mongoose.connect('mongodb://localhost/nodepop');


let fs = require('fs');


// read notices.json and users.json and insert into mongo with Models
fs.readFile('./data/notices.json', 'utf-8', (err, data) => {
  if(err) {
    console.log('error: ', err);
    process.exit(1);
  } 

  var noticesJSON = JSON.parse(data);
  const Notice = require('../models/Notice');
  for(var i = 0; i < noticesJSON.length; i++){

    const noticeJSON = noticesJSON[i];

    const name = noticeJSON.name;
    const sale = noticeJSON.sale;
    const price = noticeJSON.price;
    const photo = noticeJSON.photo;
    const tags = noticeJSON.tags;

    Notice.save(name, sale, price, photo, tags, (err, notices) =>{
        if(err){    
            next(err);
            return;
        }
        console.log('Notice saved successfully:', name);
    });
  }
  console.log('Loading notices.json file...');

});


fs.readFile('./data/users.json', 'utf-8', (err, data) => {
  if(err) {
    console.log('error: ', err);
    process.exit(1);
  } 

  var usersJSON = JSON.parse(data);
  const Notice = require('../models/User');
  for(var i = 0; i < usersJSON.length; i++){

    const userJSON = usersJSON[i];

    const name = userJSON.name;
    const email = userJSON.sale;
    const key = userJSON.price;
  

    USer.save(name, email, key, (err, notices) =>{
        if(err){    
            next(err);
            return;
        }
        console.log('User saved successfully:', name);
    });
    }
    console.log('Loading users.json file...');

});


