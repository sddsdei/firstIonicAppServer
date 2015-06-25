var app = angular.module('adminApp', ['ngRoute', 'ngFileUpload']);

function getUserList($http, next) {
    $http({
        method: 'GET',
        url: '/admin/getUserList',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    }).success(function (data) {
        if (data.status == 200) {
            return next(data.userList);
        } else {
            alert('Oops Error!');
            //$location.path('404');
        }
    });
}

function getCatList($http, next) {
    $http({
        method: 'GET',
        url: '/admin/getCatList',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    }).success(function (data) {
        if (data.status == 200) {
            return next(data.catList);
        } else {
            alert('Oops Error!');
            //$location.path('404');
        }
    });
}

function getSubCatList($http, cat_id, next) {
    $http({
        method: 'GET',
        url: '/admin/getSubCatList/' + cat_id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    }).success(function (data) {
        if (data.status == 200) {
            return next(data.subCatList);
        } else {
            alert('Oops Error!');
            //$location.path('404');
        }
    });
}