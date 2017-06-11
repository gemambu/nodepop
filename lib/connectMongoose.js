'use strict';

const mongoose = require('mongoose');
const connection = mongoose.connection;

// Indicamos que libreria de promesas que vamos a utilizar
mongoose.Promise= global.Promise;

connection.on('error', err => {
    console.log('Error de conexion', err);
    process.exit(1);
});

connection.once('open', () => {
    console.log('Conectado a mongodb');
});



mongoose.connect('mongodb://nodepop:nodepop@localhost/nodepop');

/* No necesito exportar nada, porque mongoose se
guarda la conexion auomaticamente */