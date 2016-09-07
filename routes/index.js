console.log('Imchelin is ready.');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', {headers: req.headers, session: req.session, queryString: req._parsedUrl.query});
}).post('/', function(req, res, next) {
	res.render('index', {headers: req.headers, session: req.session, queryString: req._parsedUrl.query});
});

router.get('/pseudo', function(req, res, next) {
	res.render('pseudo', {headers: req.headers, session: req.session, queryString: req._parsedUrl.query});
});

module.exports = router;
