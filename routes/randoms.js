console.log('Randoms App is ready.');
var express = require('express');
var router = express.Router();

var app = 'randoms/tpl';

router.get('/', function(req, res, next) {
	res.render('tpl', {headers: req.headers, session: req.session, queryString: req._parsedUrl.query, title: '랜선웨어', app: app, view: 'index'});
})

module.exports = router;