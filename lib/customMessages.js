'use strict';

let fs = require('fs');

var messagesJSON = fs.readFile('./data/mensajes.json', 'utf-8', (err, data) => {
    if (err) {
        console.log('Error obteniendo fichero de errores:' , err);
    }
    messagesJSON = JSON.parse(data);
});

function getMessage(lang, message){
    const messagesEN = messagesJSON.EN;
    const messagesES = messagesJSON.ES;

    // Por defecto, devolvemos los mensajes en castellano
    if(lang === undefined || lang === '' || lang.toLowerCase() === 'es' || lang.toLowerCase() !== 'en'){
        return messagesES[message];
    }
    return messagesEN[message];
}

module.exports.getMessage = getMessage;
module.exports.getMessage = getMessage;