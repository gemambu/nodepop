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

mongoose.connect('mongodb://localhost:27017/nodepop', (err) => {

    if (err) {
        console.log('Error conectando la base de datos. ', err);
        closeConn(1);
    } else {
        console.log('conexion establecida');

        // eliminamos la base de datos
        mongoose.connection.db.dropDatabase('nodepop', function (err) {        
            if(err){
                console.log('No existe la base de datos, la creamos');                
            } else {
                console.log('Base de datos eliminada');
            }
        });

        // si todo ha ido bien, creamos los anuncios
        cargaAnuncios(cargaUsuarios);
    }
});

function closeConn(err){
    console.log('Cerramos base de datos');
    mongoose.connection.close();
    process.exit(err);
}

function cargaAnuncios(callback){	
        fs.readFile('./data/anuncios.json', 'utf-8', (err, data) => {
            if (err) {
                 closeConn(1);
            }
            const Anuncio = require('../models/Anuncio');
            var anunciosJSON = JSON.parse(data);
            var arr = [];

            for(var i = 0; i < anunciosJSON.anuncios.length; i++){
                const anuncioJSON = anunciosJSON.anuncios[i];
                arr.push(anuncioJSON);   
            }
            Anuncio.insertMany(arr, (err, resultados) => {
                if(err){
                     closeConn(1);
                } else {
                    console.log('Anuncios insertados correctamente.');

                    // si todo ha ido bien, creamos los usuarios
                    callback();
                }
            });
        });
}

function cargaUsuarios(){
    fs.readFile('./data/usuarios.json', 'utf-8', (err, data) => {
        if (err) {
            closeConn(1);
        }
        const Usuario = require('../models/Usuario');
        var UsuariosJSON = JSON.parse(data);
        var arr = [];

        for(var i = 0; i < UsuariosJSON.usuarios.length; i++){
            const usuarioJSON = UsuariosJSON.usuarios[i];
            arr.push(usuarioJSON);   
        }
        Usuario.insertMany(arr, (err, resultados) => {
            if(err){
                closeConn(1);
            } else {
                console.log('Usuarios insertados correctamente. ');
                closeConn(0);
            }
        });
    });
}