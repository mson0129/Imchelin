console.log('Reviews App is ready.');
var express = require('express');
var router = express.Router();

var app = 'reviews/tpl';

router.get('/', function(req, res, next) {
	res.render('tpl', {headers: req.headers, session: req.session, queryString: req._parsedUrl.query, title: '평가', app: app, view: 'index'});
});

router.get('/restaurants/:no', function(req, res, next) {
	res.render('tpl', {headers: req.headers, session: req.session, queryString: req._parsedUrl.query, title: '음식점 &mdash; 평가', app: app, view: 'restaurants'});
});

router.get('/dishes/:no', function(req, res, next) {
	res.render('tpl', {headers: req.headers, session: req.session, queryString: req._parsedUrl.query, title: '음식 &mdash; 평가', app: app, view: 'dishes'})
});

module.exports = router;