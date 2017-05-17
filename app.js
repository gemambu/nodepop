'use strict';

const express = require('express');
const path = require('path');
// let favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Establecemos la conexión de base de datos
require('./lib/connectMongoose');
require('./models/Anuncio');
require('./models/Usuario');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
app.use('/apiv1/tags', require('./routes/apiv1/tags'));
app.use('/apiv1/registro', require('./routes/apiv1/register'));
app.use('/apiv1/usuarios/authenticate', require('./routes/apiv1/auth'));

app.use('/images/anuncios',
  express.static(path.join(__dirname, 'public/images')));


// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  if(isAPI(req)) {
    res.json({success: false, error: err.message});
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

/**
 * This function returns true if the original URL is an API
 * @param {request} req - The request to analyze
 * @return {Boolean} - returns true if the originalURL was from API
*/
function isAPI(req) {
  return req.originalUrl.indexOf('/apiv') === 0;
}

module.exports = app;
