console.log('Imchelin is ready.');
var express = require('express');
var router = express.Router();
var ews = require('ews-javascript-api');
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'gmgcjwawatv599gq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	post: 3306,
	user: 'fya5hs8lwo12q45d',
	password: 'tot39atzvyxc5kbi',
	database: 'hqtmtvt9ueap7yfs',
	connectionLimit: 5,
	waitForConnections: false
});

router.get('/', function(req, res, next) {
	res.render('index', {headers: req.headers, queryString: req._parsedUrl.query, view: ''});
}).post('/', function(req, res, next) {
	res.send('sry.');
});

router.get('/pseudo', function(req, res, next) {
	res.render('pseudo', {headers: req.headers, queryString: req._parsedUrl.query});
});

module.exports = router;
