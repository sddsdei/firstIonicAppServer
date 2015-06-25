var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');

var userModel = require('../model/users');

var admin = require('../controller/adminsController');
var adminProduct = require('../controller/adminProductsController');
var passport = require('../passport/passport');


router.get('/loginx', function (req, res, next) {
    res.redirect('/admin');
}).post('/login',
        passport.authenticate('local'),
        function (req, res, next) {
            if (req.session.passport.user) {
                res.redirect('/admin');
            } else {
                res.sendStatus(500);
            }
        });

router.post('/signup', function (req, res, next) {
    if (admin.signup(req.body)) {
        if (admin.login(req)) {
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
    if (req.session.passport.user) {
        res.render('admin_layout', {title: 'Express'});
    } else {
        res.render('admins/login', {title: 'Express'});
    }
});

router.use(function (req, res, next) {
    if (req.session.passport.user) {
        next();
    } else {
        res.redirect('/#/login');
    }
});

router.use('/dashboard', function (req, res, next) {
    admin.dashboardInfo(req, res, function (dashboardData) {
        res.json({status: 200, dashboardData: dashboardData});
    });
});

router.use('/getLoginUserData', function (req, res, next) {
    res.json({status: 200, loginUserData: req.session.passport.user});
});

router.post('/addUser', function (req, res, next) {
    admin.addUser(req, res, function (status) {
        if (status)
            res.sendStatus(200);
    });
});

router.use('/userList', function (req, res, next) {
    admin.listUsers(req, res, function (fileData) {
        res.json({status: 200, fileData: fileData});
    });
});

router.get('/viewUser/:id', function (req, res, next) {
    admin.viewUser(req, res, function (data) {
        res.json({status: 200, data: data});
    });
});

router.get('/getUserList', function (req, res, next) {
    admin.getUserList(req, res, function (userList) {
        res.json({status: 200, userList: userList});
    });
});

router.get('/storyList', function (req, res, next) {
    admin.listStory(req, res, function (fileData) {
        res.json({status: 200, fileData: fileData});
    });
});

router.get('/viewStory/:id', function (req, res, next) {
    admin.viewStory(req, res, function (data) {
        res.json({status: 200, data: data});
    });
});

router.post('/addStory', function (req, res, next) {
    admin.addStory(req, res, function (status) {
        if (status)
            res.sendStatus(200);
    });
});

router.get('/search', function (req, res, next) {
    admin.searchStory(req, res, function (fileData) {
        res.json({status: 200, fileData: fileData});
    });
});

router.use('/logout', function (req, res, next) {
    req.session.destroy();
    res.redirect('/admin');
});

/** Products START **/
router.post('/addCat', function (req, res, next) {
    adminProduct.addCat(req, res, function (status) {
        if (status)
            res.sendStatus(200);
    });
});

router.get('/catList', function (req, res, next) {
    adminProduct.listCat(req, res, function (fileData) {
        res.json({status: 200, fileData: fileData});
    });
});

router.get('/viewCat/:id', function (req, res, next) {
    adminProduct.viewCat(req, res, function (data) {
        res.json({status: 200, data: data});
    });
});

router.get('/getCatList', function (req, res, next) {
    adminProduct.getCatList(req, res, function (catList) {
        res.json({status: 200, catList: catList});
    });
});

router.post('/addSubCat', function (req, res, next) {
    adminProduct.addSubCat(req, res, function (status) {
        if (status)
            res.sendStatus(200);
    });
});

router.get('/subCatList', function (req, res, next) {
    adminProduct.listSubCat(req, res, function (fileData) {
        res.json({status: 200, fileData: fileData});
    });
});

router.get('/viewSubCat/:id', function (req, res, next) {
    adminProduct.viewSubCat(req, res, function (data) {
        res.json({status: 200, data: data});
    });
});

router.get('/getSubCatList/:cat_id', function (req, res, next) {
    adminProduct.getSubCatList(req, res, function (subCatList) {
        res.json({status: 200, subCatList: subCatList});
    });
});

router.post('/addProd', function (req, res, next) {
    adminProduct.addProd(req, res, function (status) {
        if (status)
            res.sendStatus(200);
    });
});

router.get('/prodList', function (req, res, next) {
    adminProduct.listProd(req, res, function (fileData) {
        res.json({status: 200, fileData: fileData});
    });
});

router.get('/viewProd/:id', function (req, res, next) {
    adminProduct.viewProd(req, res, function (data) {
        res.json({status: 200, data: data});
    });
});

module.exports = router;
