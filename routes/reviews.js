console.log('Reviews App is ready.');
var express = require('express');
var router = express.Router();

var app = 'reviews/tpl';

router.get('/', function(req, res, next) {
	

	res.render('tpl', {headers: req.headers, session: req.session, queryString: req._parsedUrl.query, title: '평가', app: app, view: 'index'});
})

module.exports = router;