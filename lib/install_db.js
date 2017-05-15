'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;

let fs = require('fs');

// Indicamos que libreria de promesas que vamos a utilizar
mongoose.Promise = global.Promise;

conn.on('error', err => {
    console.log('Error de conexion', err);
    process.exit(1);
});

mongoose.connect('mongodb://localhost:27017/nodepop', (err, db) => {

    if (err) {
        console.log('Error conectando la base de datos. ', err);
        process.exit(1);
    } else {
        console.log('Conexión establecida con la base de datos');

        mongoose.connection.dropDatabase('nodepop', function (err) {
            if(err){
                console.log('No existe la base de datos, la creamos');
            } else {
                console.log('Coleccion eliminada');
            }
        });

        loadNotices()
        .then(loadUsers)
        .then(closeConn)
        .catch(err => {
            console.log('Carga de ficheros finalizada con error. ', err);
            mongoose.connection.close();
            process.exit(1);
        });
    }
});

function closeConn(){
    console.log('Finalizado correctamente');
    mongoose.connection.close();
    process.exit(0);
}

function loadNotices(){	
    return new Promise((resolve, reject) => {
        fs.readFile('./data/notices.json', 'utf-8', function(err, data) {
            if (err) {
                reject();
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
                    reject();
                } else {
                    console.log('Anuncios insertados correctamente:', resultados );
                    resolve();
                }
            });
        });
    });
}

function loadUsers(){
    return new Promise((resolve, reject) => {
        fs.readFile('./data/users.json', 'utf-8', function(err, data) {
        if (err) {
            reject();
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
                reject();
            } else {
                console.log('Usuarios insertados correctamente: ', resultados);
                resolve();
            }
        });
     });

    });	

}