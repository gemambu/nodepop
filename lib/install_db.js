'use strict';

const mongoose = require('mongoose');
const connection = mongoose.connection;

let fs = require('fs');

// Indicamos que libreria de promesas que vamos a utilizar
mongoose.Promise = global.Promise;

connection.on('error', err => {
    console.log('Error de conexion', err);
    process.exit(1);
});



mongoose.connect('mongodb://localhost:27017/nodepop', (err, db) => {

    if (err) {
        console.log('Error conectando la base de datos. ', err);
        closeConn(1);
    } else {
        console.log('conexion establecida');

        mongoose.connection.db.dropDatabase('nodepop', function (err) {        
            if(err){
                console.log('No existe la base de datos, la creamos');                
            } else {
                console.log('Base de datos eliminada');
            }
        });

        loadAnuncios(loadUsers);
    }
});

function closeConn(err){
    console.log('Cerramos base de datos');
    mongoose.connection.close();
    process.exit(err);
}

function loadAnuncios(callback){	
        fs.readFile('./data/notices.json', 'utf-8', (err, data) => {
            if (err) {
                 closeConn(1);
            }
            const Notice = require('../models/Notice');
            var noticesJSON = JSON.parse(data);
            var arr = [];

            for(var i = 0; i < noticesJSON.notices.length; i++){
                const noticeJSON = noticesJSON.notices[i];
                arr.push(noticeJSON);   
            }
            Notice.insertMany(arr, (err, resultados) => {
                if(err){
                     closeConn(1);
                } else {
                    console.log('Anuncios insertados correctamente:', resultados );
                    callback();
                }
            });
        });
}

function loadUsers(){
        fs.readFile('./data/users.json', 'utf-8', (err, data) => {
            if (err) {
                closeConn(1);
            }
            const User = require('../models/User');
            var UsersJSON = JSON.parse(data);
            var arr = [];

            for(var i = 0; i < UsersJSON.users.length; i++){
                const userJSON = UsersJSON.users[i];
                arr.push(userJSON);   
            }
            User.insertMany(arr, (err, resultados) => {
                if(err){
                    closeConn(1);
                } else {
                    console.log('Usuarios insertados correctamente: ', resultados);
                   closeConn(0);
                }
            });
     });
}