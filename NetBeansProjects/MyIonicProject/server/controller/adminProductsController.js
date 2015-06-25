var express = require('express');
var app = express();
var fs = require('fs');
var mongoose = require('mongoose');
var userModel = require('../model/users');
var storyModel = require('../model/stories');
var catModel = require('../model/categories');
var subCatModel = require('../model/subCategories');
var prodModel = require('../model/products');

exports.addCat = function (req, res, next) {
    if (req.files.file.name) {
        req.body.catImage = req.files.file.name;
    }

    if (req.body._id) {
        //Updating
        var uid = req.body._id;
        delete req.body._id;

        catModel.where('_id', uid).update({'$set': req.body}, function (err, savedData) {
            if (err) {
                throw err;
            } else {
                return next(1);
            }
        });
    } else {
        //Adding
        var savingData = new catModel(req.body);
        savingData.save(function (err, savedData) {
            if (err) {
                throw err;
            } else {
                return next(1);
            }
        });
    }
};

exports.getCatList = function (req, res, next) {
    catModel.find({}, '_id name', function (err, foundData) {
        if (err)
            throw err;
        return next(foundData);
    });
};

exports.listCat = function (req, res, next) {
    catModel.find(function (err, foundData) {
        if (err)
            throw err;
        return next(foundData);
    });
};

exports.viewCat = function (req, res, next) {
    catModel.findOne({'_id': req.params.id}, function (err, foundData) {
        if (err)
            throw err;

        return next(foundData);
    });
};

exports.addSubCat = function (req, res, next) {
    if (req.files.file.name) {
        req.body.subCatImage = req.files.file.name;
    }

    if (req.body._id) {
        //Updating
        var uid = req.body._id;
        delete req.body._id;

        subCatModel.where('_id', uid).update({'$set': req.body}, function (err, savedData) {
            if (err) {
                throw err;
            } else {
                return next(1);
            }
        });
    } else {
        //Adding
        var savingData = new subCatModel(req.body);
        savingData.save(function (err, savedData) {
            if (err) {
                throw err;
            } else {
                return next(1);
            }
        });
    }
};

exports.getSubCatList = function (req, res, next) {
    subCatModel.find({'cat_id': req.params.cat_id}, '_id name', function (err, foundData) {
        if (err)
            throw err;
        return next(foundData);
    });
};

exports.listSubCat = function (req, res, next) {
    subCatModel.find(function (err, foundData) {
        if (err)
            throw err;
        return next(foundData);
    }).populate('cat_id');
};

exports.viewSubCat = function (req, res, next) {
    subCatModel.findOne({'_id': req.params.id}, function (err, foundData) {
        if (err)
            throw err;

        return next(foundData);
    });
};

exports.addProd = function (req, res, next) {
    if (req.files.file.name) {
        req.body.prodImage = req.files.file.name;
    }

    if (req.body._id) {
        //Updating
        var uid = req.body._id;
        delete req.body._id;

        prodModel.where('_id', uid).update({'$set': req.body}, function (err, savedData) {
            if (err) {
                throw err;
            } else {
                return next(1);
            }
        });
    } else {
        //Adding
        var savingData = new prodModel(req.body);
        savingData.save(function (err, savedData) {
            if (err) {
                throw err;
            } else {
                return next(1);
            }
        });
    }
};

exports.listProd = function (req, res, next) {
    prodModel.find(function (err, foundData) {
        if (err)
            throw err;
        return next(foundData);
    }).populate('cat_id').populate('subCat_id');
};

exports.viewProd = function (req, res, next) {
    prodModel.findOne({'_id': req.params.id}, function (err, foundData) {
        if (err)
            throw err;

        return next(foundData);
    });
};