"use strict"

var express = require('express');
var router = express.Router();

router.get('/images/:imageName', function(req, res) {
    console.log('llego aqui');
  var image = req.params['imageName'];
  res.header('Content-Type', "image/gif");
  fs.readFile(image, 'utf8', function(err, data){
    if(err){
      res.end(404);
    }
    res.send(data)    
  });
});
