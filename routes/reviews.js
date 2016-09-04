console.log('Reviews App is ready.');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('tpl', {headers: req.headers, queryString: req._parsedUrl.query});
})

module.exports = router;