console.log('Admin App is ready.');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', {headers: req.headers, session: req.session, queryString: req._parsedUrl.query});
});

router.get('/kinds/add', function(req, res, next) {
    req.send('ffff');
});
router.get('/spots/add', function(req, res, next) {
    req.send('ffff');
});
router.get('/restaurants/add', function(req, res, next) {
    req.send('ffff');
});
router.get('/dishes/add', function(req, res, next) {
    req.send('ffff');
});

module.exports = router;