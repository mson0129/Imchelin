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

router.get('/*', function(req, res, next) {
	//res.redirect('/users');
	next();
});

router.get('/dishes', function(req, res, next) {
	var query = pool.query('SELECT * FROM imchelin_dishes ORDER BY imchelin_dishes.no;', function(err, rows) {});
}).post('/dishes', function(req, res, next) {
 	var query = pool.query('INSERT INTO imchelin_dishes () VALUES ();', function(err, rows) {});
}).put('/dishes', function(req, res, next) {
	var no = 1;
	var query = pool.query('UPDATE imchelin_dishes SET no=? WHERE no=?;', [no], function(err, rows) {});
}).delete('/dishes', function(req, res, next) {
	var no = 1;
	var query = pool.query('DELETE FROM imchelin_dishes WHERE no=?;', [no], function(err, rows) {});
});

router.get('/restaurants', function(req, res, next) {
	var where = '';
	//no, name, tags, spots, kinds
	if(req.query.no)
		where += ' AND imchelin_restaurants.no = '+mysql.escape(req.query.no);
	if(req.query.name) {
		if(req.query.name.substr(0, 1)=='%' || req.query.name.substr(req.query.name.length-1, 1)=='%') {
			where += ' AND imchelin_restaurants.name LIKE '+mysql.escape(req.query.name);
		} else {
			where += ' AND imchelin_restaurants.name = '+mysql.escape(req.query.name);
		}
	}
	if(req.query.spots) {
		if(req.query.spots.substr(0, 1)=='%' || req.query.spots.substr(req.query.spots.length-1, 1)=='%') {
			where += ' AND imchelin_spots.name LIKE '+mysql.escape(req.query.spots);
		} else {
			where += ' AND imchelin_spots.name = '+mysql.escape(req.query.spots);
		}
	}
	if(req.query.kinds) {
		if(req.query.kinds.substr(0, 1)=='%' || req.query.kinds.substr(req.query.kinds.length-1, 1)=='%') {
			where += ' AND imchelin_kinds.name LIKE '+mysql.escape(req.query.kinds);
		} else {
			where += ' AND imchelin_kinds.name = '+mysql.escape(req.query.kinds);
		}
	}
	if(req.query.tags) {
		if(req.query.tags.substr(0, 1)=='#')
			req.query.tags = req.query.tags.substr(1).replace( /(\s*)/g, "");
		var tags = req.query.tags.split('#');
		var subWhere = '0';
		tags.forEach(function(value, index) {
			subWhere += ' OR imchelin_restaurants.tags LIKE '+mysql.escape('%#'+value+'%');
		});
		where += ' AND ('+subWhere+')';
	}
	var sql = 'SELECT imchelin_restaurants.*, imchelin_spots.name AS spots, imchelin_kinds.name AS kinds FROM imchelin_restaurants LEFT JOIN imchelin_spots ON imchelin_restaurants.spots_no = imchelin_spots.no LEFT JOIN imchelin_kinds ON imchelin_restaurants.kinds_no = imchelin_kinds.no WHERE 1'+where+' ORDER BY imchelin_restaurants.opendate DESC;';
	var query = pool.query(sql, function(err, rows) {
		if(err) {
			console.log(err);
			throw err;
		} else {
			res.send(JSON.stringify(rows));
		}
	});
	console.log(query.sql);
}).post('/restaurants', function(req, res, next) {

}).put('/restaurants', function(req, res, next) {

}).delete('/restaurants', function(req, res, next) {

});

//users
router.get('/users', function(req, res, next) {
	//req.query;
	res.send('');
}).post('/users', function(req, res, next) {
	//req.body;
	res.send('');
}).put('/users', function(req, res, next) {
	//req.body;
	res.send('');
}).delete('/users', function(req, res, next) {
	//req.body;
	res.send('');
});

/*dishes*/
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

/*Users*/
router.get('/oauth2/auth', function(req, res, next) {
	//https://developers.google.com/youtube/v3/guides/auth/server-side-web-apps
	//client_id
	//redirect_uri
	//response_type
	//scope
	//approval_prompt
	//access_type
	//state
	//login_hint
});

module.exports = router;
