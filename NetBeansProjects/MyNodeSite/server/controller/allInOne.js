var express = require('express');
var app = express();
var fs = require('fs');
var mongoose = require('mongoose');
var userModel = require('../model/users');
var storyModel = require('../model/stories');

var index = function () {
    return "Here";
};
exports.index = index;

var create = function (req, res, next) {
    var savingData = new storyModel(req.body);
    savingData.save(function (err, savedData) {
        if (err) {
            throw err;
        } else {
            return next(1);
        }
    });
};

var listStory = function (req, res, next) {
    storyModel.find(function (err, foundData) {
        if (err)
            throw err;
        return next(foundData);
    });
};

var viewStory = function (req, res, next) {
    storyModel.findOne({'_id': req.params.id}, function (err, foundData) {
        if (err)
            throw err;
        console.log(foundData);
        return next(foundData);
    });
};

var searchStory = function (req, res, next) {
    var reg = new RegExp(req.query.search, 'gi');
    storyModel.find({$or: [{'name': reg}, {'heading': reg}, {'shortDesc': reg}, {'story': reg}]}, function (err, foundData) {
        if (err)
            throw err;
        console.log(foundData);
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


exports.create = create;
exports.listStory = listStory;
exports.viewStory = viewStory;
exports.searchStory = searchStory;