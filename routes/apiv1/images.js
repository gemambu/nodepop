'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/images/:imageName', function(req, res) {
    console.log('llego aqui');
  var imageName = req.params.imageName;
  res.header('Content-Type', 'image/gif');
  fs.readFile(imageName, 'utf8', function(err, data){
    if(err){
      res.end(404);
    }
    res.send(data);
  });
});
