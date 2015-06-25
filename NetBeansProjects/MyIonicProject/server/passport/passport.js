var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userModel = require('../model/users');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
function (email, password, done) {
    userModel.findOne({email: email}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: 'Incorrect username'});
        }
        //matching password
        console.log('matching password');
        user.comparePassword(password, function (err, isMatch) {
            if (err)
                throw err;
            console.log('Password--wow-:', isMatch);
            if (isMatch) {
                console.log('success');
                return done(null, user);
                //return next(user);
            } else {
                console.log('incorrect');
                return done(null, false, {message: 'Incorrect password.'});
            }
        });

    });
}));

passport.serializeUser(function (user, done) {
    console.log('serialize');
    done(null, user);
});

passport.deserializeUser(function (id, done) {
    console.log('deserialize');
    done(null, id);
});

module.exports = passport;