console.log('API is ready.');
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

router.get('/getDishes', function(req, res, next) {
    var query = pool.query('SELECT imchelin_dishes.*, imchelin_restaurants.name AS restaurants, imchelin_spots.no AS spots_no, imchelin_spots.name AS spots FROM imchelin_dishes LEFT JOIN imchelin_restaurants ON imchelin_dishes.restaurants_no = imchelin_restaurants.no LEFT JOIN imchelin_spots ON imchelin_restaurants.spots_no = imchelin_spots.no ORDER BY imchelin_dishes.no;', function(err, rows) {
        res.send(JSON.stringify(rows));
    });
});

router.get('/getDishes/:no', function(req, res, next) {
	var query = pool.query('SELECT imchelin_dishes.* FROM imchelin_dishes ORDER BY no;', function(err, rows) {
        res.send(JSON.stringify(rows));
    });
});

router.get('/getDishes/spots/:no', function(req, res, next) {
	res.send('getDishes by spots_no');
});

router.get('/getDishes/restaurants/:no', function(req, res, next) {
	res.send('getDishes by restaurants_no');
});

module.exports = router;