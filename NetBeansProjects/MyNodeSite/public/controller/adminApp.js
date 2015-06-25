var app = angular.module('adminApp', ['ngRoute', 'ngFileUpload']);



app.filter("sanitize", ['$sce', function ($sce) {
        return function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };
    }]);

app.filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);

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

app.directive('errSrc', function () {
    return {
        link: function (scope, element, attrs) {
            element.bind('error', function () {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }
});