console.log('Users App is ready.');
var express = require('express');
var router = express.Router();
var ews = require('ews-javascript-api');

router.get('/*', function(req, res, next) {
	console.log(req.session);
	next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
	if(!req.session.email) {
		res.render('users', {headers: req.headers, session: req.session, queryString: req._parsedUrl.query, msg: null});
	} else {
        req.session.destroy();
		res.redirect('/');
	}
}).post('/', function(req, res, next) {
	if(req.body.email!='' && req.body.password!='') {
		var autod = new ews.AutodiscoverService(new ews.Uri("https://mail.fasoo.com/autodiscover/autodiscover.svc"), ews.ExchangeVersion.Exchange2013);
	    autod.Credentials = new ews.ExchangeCredentials(req.body.email, req.body.password);
    	//create array to include list of desired settings 
    	var settings = [
    	ews.UserSettingName.InternalEwsUrl,
	    ews.UserSettingName.ExternalEwsUrl,
    	ews.UserSettingName.UserDisplayName,
	    ews.UserSettingName.UserDN,
	    ews.UserSettingName.EwsPartnerUrl,
	    ews.UserSettingName.DocumentSharingLocations,
	    ews.UserSettingName.MailboxDN,
	    ews.UserSettingName.ActiveDirectoryServer,
	    ews.UserSettingName.CasVersion,
	    ews.UserSettingName.ExternalWebClientUrls,
	    ews.UserSettingName.ExternalImap4Connections,
	    ews.UserSettingName.AlternateMailboxes
	    ];
	    //get the setting 
	    autod.GetUserSettings([req.body.email], settings)
	    .then(function (response) {
    	    if(response) {
	            //로그인 정보 굿굿
    	        req.session.email = req.body.email;
	            //do what you want with user settings     
	            var tabcount = 0;
	            var tabs = function () { return ews.StringHelper.Repeat("\t", tabcount); };
	            for (var _i = 0, _a = response.Responses; _i < _a.length; _i++) {
	                var resp = _a[_i];
	                console.log(ews.StringHelper.Format("{0}settings for email: {1}", tabs(), resp.SmtpAddress));
	                tabcount++;
	                for (var setting in resp.Settings) {
	                    console.log(ews.StringHelper.Format("{0}{1} = {2}", tabs(), ews.UserSettingName[setting], resp.Settings[setting]));
	                }
	                tabcount--;
	                req.session.name = resp.Settings[0];
	            }
	            res.redirect('/');
	        } else {
	            //로그인 정보 오류
	            console.log('Email or Password is wrong.');
	            res.render('users', {headers: req.headers, session: req.session, queryString: req._parsedUrl.query, msg: '이메일 또는 암호가 잘못되었습니다.'});
	        }
	    }, function (e) {
	        //log errors or do something with errors
	        console.log('Exchange Error!');
	        res.render('users', {headers: req.headers, session: req.session, queryString: req._parsedUrl.query, msg: '익스체인지 서버에 오류가 발생했습니다.'});
	    });
	} else {
		//로그인 정보 이메일 또는 암호 생략됨
		console.log('Email or Password is not input.');
		res.render('users', {headers: req.headers, session: req.session, queryString: req._parsedUrl.query, msg: '이메일 또는 암호가 입력되지 않았습니다.'});
	}
    //res.send(401, null);
});

module.exports = router;
