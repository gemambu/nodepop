'use strict';

// Método que comprueba si el dato introducido como email tiene el formato correcto
function isValidEmail(email){
    if(email === '' ){
        return false;
    }
    return /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);
}

// comprobamos los tags válidos para nuestro servidor
function checkTags(tags){
    const validTags = ['work', 'lifestyle', 'motor', 'mobile'];
    var result = true; 

    if(tags.indexOf(',') === -1){
        // sólo un tag
        if(validTags.indexOf(tags) === -1){
            result = false;
        }
    } else {
        const arrayTags = tags.split(',');
        for(var i = 0; i < arrayTags.length; i++){
            const tag = arrayTags[i].trim();
            if(validTags.indexOf(tag) === -1){
                result = false;
            }
        }
    }

    return result;
}

// Método auxiliar para la comprobación de tags
function removeSpaces(tags){
    var result = '';

    if(tags.indexOf(',') === -1){
        // sólo un tag
        result = tags.trim();
    } else {
        const arrayTags = tags.split(',');
        result = [];
        for(var i = 0; i < arrayTags.length; i++){       
            result.push(arrayTags[i].trim());
        }
    }
    return result;
}

module.exports.isValidEmail = isValidEmail;
module.exports.checkTags = checkTags;
module.exports.removeSpaces = removeSpaces;