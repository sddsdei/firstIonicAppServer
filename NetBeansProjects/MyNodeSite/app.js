var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var cors = require('cors');

var bodyParser = require('body-parser');
var db = require('./config/db');

// routes
var routes = require('./server/routes/index');
var users = require('./server/routes/users');
var adminRoutes = require('./server/routes/adminRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, './public/view'));
//app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

app.use(expressSession({
    secret: 'тнιѕѕє¢яєтѕнσυℓ∂иσтвєяєνєαℓє∂ℓσℓz',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(multer({dest:'./public/assets/files/'}));

//app.use(function (req, res, next) {
//    if (typeof (req.body.email !== 'undefined') && typeof (req.body.password !== 'undefined')) {
//        req.session.cookie.maxAge = 24 * 60 * 60 * 1000;
//        next();
//    }
//});

app.use(express.static(path.join(__dirname, 'public')));

//app.use(session({
//    secret: 'somesecrettokenhere',
//    duration: 30 * 60 * 1000,
//    activeDuration: 5 * 60 * 1000,
//    resave: true,
//    saveUninitialized: true
//}));

app.use('/users', users);
app.use('/admin', adminRoutes);
app.use('/', routes);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
