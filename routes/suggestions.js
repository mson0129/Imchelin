console.log('Suggestions App is ready.');
var express = require('express');
var router = express.Router();

var app = 'randoms/tpl';

router.get('/', function(req, res, next) {
	res.render('tpl', {headers: req.headers, queryString: req._parsedUrl.query, title: '랜덤', app: app, view: 'index'});
})

module.exports = router;