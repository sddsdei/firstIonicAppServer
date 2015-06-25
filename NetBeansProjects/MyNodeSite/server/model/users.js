var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, index: {unique: true}},
    email: {type: String, required: true, index: {unique: true}},
    profileimage: {type: String},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    qualification: String,
    age: Number,
    created: {type: "Date", default: Date.now()}
});

userSchema.pre('save', function (next) {
    console.log('pre Save');
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        console.log('Modi Pass');
        return next();
    }

    // generate a salt
    console.log('pre Salt');
    bcrypt.genSalt(10, function (err, salt) {
        console.log('IN Salt');
        if (err)
            return next(err);

        // hash the password using our new salt
        console.log('pre Hash');
        bcrypt.hash(user.password, salt, function (err, hash) {
            console.log('IN Hash');
            if (err)
                return next(err);

            console.log('Wow Done');
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
