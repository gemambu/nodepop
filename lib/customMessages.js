'use strict';

let fs = require('fs');

var messagesJSON = fs.readFile('./data/mensajes.json', 'utf-8', (err, data) => {
    if (err) {
        console.log('Error obteniendo fichero de errores:' , err);
    }

    messagesJSON = JSON.parse(data);

});

function getError(lang, error){
    const erroresEN = messagesJSON.EN;
    const erroresES = messagesJSON.ES;

    if(lang === undefined || lang === '' || lang === 'es' || lang === 'ES'){
        return erroresES[error];
    }

    return erroresEN[error];
}

function getMessage(lang, message){
    const messagesEN = messagesJSON.EN;
    const messagesES = messagesJSON.ES;

    if(lang === undefined || lang === '' || lang === 'es' || lang === 'ES'){
        return messagesES[message];
    }

    return messagesEN[message];
}

module.exports.getError = getError;
module.exports.getMessage = getMessage;