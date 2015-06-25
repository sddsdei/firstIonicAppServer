var express = require('express');
var app = express();
var fs = require('fs');
var mongoose = require('mongoose');
var userModel = require('../model/users');
var storyModel = require('../model/stories');

exports.dashboardInfo = function (req, res, next) {
    userModel.count(function (err, userCount) {
        if (err)
            throw err;

        storyModel.count(function (err, storyCount) {
            if (err)
                throw err;
            return next({userCount: userCount, storyCount: storyCount});
        });
    });
};

exports.addUser = function (req, res, next) {
    if (req.files.file.name) {
        req.body.profileimage = req.files.file.name;
    }

    if (req.body._id) {
        //Updating
        var uid = req.body._id;
        delete req.body._id;

        userModel.where('_id', uid).update({'$set': req.body}, function (err, savedData) {
            if (err) {
                throw err;
            } else {
                return next(1);
            }
        });
    } else {
        //Adding
        var savingData = new userModel(req.body);
        savingData.save(function (err, savedData) {
            if (err) {
                throw err;
            } else {
                return next(1);
            }
        });
    }
};

exports.getUserList = function (req, res, next) {
    userModel.find({}, '_id name', function (err, foundData) {
        if (err)
            throw err;
        return next(foundData);
    });
};

exports.addStory = function (req, res, next) {
    if (req.body._id) {
        //Updating
        var uid = req.body._id;
        delete req.body._id;
        storyModel.where('_id', uid).update({'$set': req.body}, function (err, savedData) {
            if (err) {
                throw err;
            } else {
                return next(1);
            }
        });
    } else {
        //Adding
        var savingData = new storyModel(req.body);
        savingData.save(function (err, savedData) {
            if (err) {
                throw err;
            } else {
                return next(1);
            }
        });
    }
};

exports.listUsers = function (req, res, next) {
    userModel.find(function (err, foundData) {
        if (err)
            throw err;
        return next(foundData);
    });
};

exports.viewUser = function (req, res, next) {
    userModel.findOne({'_id': req.params.id}, '_id age name created email phone qualification username profileimage', function (err, foundData) {
        if (err)
            throw err;

        return next(foundData);
    });
};


exports.listStory = function (req, res, next) {
    storyModel.find(function (err, foundData) {
        if (err)
            throw err;
        return next(foundData);
    }).populate('user_id');
};

exports.viewStory = function (req, res, next) {
    storyModel.findOne({'_id': req.params.id}, function (err, foundData) {
        if (err)
            throw err;
        return next(foundData);
    }).populate('user_id');
};

exports.searchStory = function (req, res, next) {
    var reg = new RegExp(req.query.search, 'gi');
    storyModel.find({$or: [{'name': reg}, {'heading': reg}, {'shortDesc': reg}, {'story': reg}]}, function (err, foundData) {
        if (err)
            throw err;
        return next(foundData);
    });
};

exports.signup = function (userData) {
    if (userData.password === userData.confirmPassword) {
        delete userData.confirmPassword;
    } else {
        throw 'mismatch';
        return 0;
    }

    var data = new userModel(userData);
    data.save(function (err, data) {
        if (err) {
            throw err;
        } else {
            return 1;
        }
    });
};

exports.login = function (req, res, next) {
    // fetch user and password verification
    userModel.findOne({email: req.body.email}, function (err, user) {
        if (err)
            throw err;

        //matching password
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err)
                throw err;
            console.log('Password123:', isMatch);
            if (isMatch) {
                return next(user);
            } else {
                return 0;
            }
        });
    });

    return 1;//flag;
};