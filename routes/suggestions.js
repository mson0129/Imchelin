console.log('Suggestions App is ready.');
var express = require('express');
var router = express.Router();

var app = 'suggestions/tpl';

router.get('/*', function(req, res, next) {
	if(!req.session.email) {
		res.redirect('/users');
	} else {
		next();
	}
});

router.get('/', function(req, res, next) {
	res.render('tpl', {headers: req.headers, session: req.session, queryString: req._parsedUrl.query, title: '제안', app: app, view: 'index'});
})

module.exports = router;