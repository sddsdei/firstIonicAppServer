var express = require('express');
var router = express.Router();
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var mongoose = require('mongoose');

var userModel = require('../model/users');

var all = require('../controller/allInOne');
var passport = require('../passport/passport');


router.get('/loginx', function (req, res, next) {
    res.render('layout', {title: 'Express'});
    //res.sendStatus(200);
}).post('/login',
        passport.authenticate('local'),
        function (req, res, next) {
            if (req.session.passport.user) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        });



router.get('/signupx', function (req, res, next) {
    res.render('signup', {title: 'Express'});
}).post('/signup', function (req, res, next) {
    if (all.signup(req.body)) {
        if (all.login(req)) {
            res.sendStatus(200);
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
});

/* GET home page. */
router.get('/', function (req, res, next) {
//    res.render('index', {title: 'Express'});
    res.render('layout', {title: 'Express'});
});

router.use(function (req, res, next) {
    if (req.session.passport.user) {
        next();
    } else {
        //res.redirect('/login');
        res.redirect('/#/login');
    }
});


router.get('/createx', function (req, res, next) {
    res.render('create', {title: 'Express'});
}).post('/create', function (req, res, next) {
    all.create(req.body, res, function (status) {
        if (status)
            res.sendStatus(200);
    });
});

router.get('/view/:id', function (req, res, next) {
    all.viewStory(req, res, function (data) {
        //res.render('view', {title: 'Express', data: data});
        res.json({status: 200, data: data});
    });
});

router.get('/list', function (req, res, next) {
    all.listStory(req, res, function (fileData) {
//        res.render('list', {title: 'Express', fileData: fileData});
        res.json({status: 200, fileData: fileData});
//        res.redirect('/#/list');
    });
});

router.get('/search', function (req, res, next) {
    all.searchStory(req, res, function (fileData) {
//        res.render('list', {title: 'Express', fileData: fileData});
        res.json({status: 200, fileData: fileData});
    });
});

router.post('/uploader', multipartMiddleware, function (req, res) {
    var fs = require('fs');

    fs.readFile(req.files.upload.path, function (err, data) {
        var newPath = __dirname + '/../public/uploads/' + req.files.upload.name;
        fs.writeFile(newPath, data, function (err) {
            if (err)
                console.log({err: err});
            else {
                html = "";
                html += "<script type='text/javascript'>";
                html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
                html += "    var url     = \"/uploads/" + req.files.upload.name + "\";";
                html += "    var message = \"Uploaded file successfully\";";
                html += "";
                html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
                html += "</script>";

                res.send(html);
            }
        });
    });
});

router.use('/logout', function (req, res, next) {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
