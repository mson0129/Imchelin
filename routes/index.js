console.log('Imchelin is ready.');
var express = require('express');
var router = express.Router();
/*
var ews = require('ews-javascript-api');
var mysql = require('mysql');
var pool = mysql.createPool({

});
*/

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}).post('/', function(req, res, next) {
  res.send('sry.');
});

router.get('/pseudo', function(req, res, next) {
  res.render('pseudo', {headers: req.headers, queryString: req._parsedUrl.query});
});

module.exports = router;
