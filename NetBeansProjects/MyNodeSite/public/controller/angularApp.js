var app = angular.module('storifierApp', ['ngRoute', 'ngSanitize'])
        .controller('indexCtrl', function ($rootScope) {
            $rootScope.texts = {
                'heading': 'Storyfier',
                'subheading': 'A Clean Story Site - For Your Best Stories',
                'bkImg': 'home-bg.jpg'
            };
        })
        .controller('loginCtrl', function ($http, $scope, $location) {
            $scope.submit = function () {
                $http({
                    method: 'POST',
                    url: '/login',
                    data: $.param($scope.formData), // pass in data as strings
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
                }).success(function (data) {
                    if (data == 'OK') {
                        $location.path('list');
                    } else {
                        $location.path('signup');
                    }
                });
            };
        })
        .controller('listCtrl', function ($http, $location, $scope, $rootScope) {
            $rootScope.texts = {
                'heading': 'Storyfier',
                'subheading': 'A Clean Story Site - For Your Best Stories',
                'bkImg': 'home-bg.jpg'
            };

            $http({
                method: 'GET',
                url: '/list',
                //data: $.param($scope.formData), // pass in data as strings
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
            }).success(function (data) {
                if (data.status == 200) {
                    $scope.stories = data.fileData;
                } else {
                    $location.path('404');
                }
            });
        })
        .controller('searchCtrl', function ($http, $scope, $rootScope, $location) {
            $scope.submit = function () {
                $http({
                    method: 'GET',
                    url: '/search?' + $.param($scope.formData),
                    //data: $.param($scope.formData), // pass in data as strings
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
                }).success(function (data) {
                    if (data.status == 200) {
                        $rootScope.stories = data.fileData;
                        $location.path('search');
                    } else {
                        $location.path('404');
                    }
                });
            };
        })
        .controller('viewCtrl', function ($http, $location, $scope, $routeParams, $rootScope) {


            $http({
                method: 'GET',
                url: '/view/' + $routeParams.id,
                //data: $.param($scope.formData), // pass in data as strings
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
            }).success(function (data) {
                if (data.status == 200) {
                    $scope.story = data.data;
                    $rootScope.texts = {
                        'heading': data.data.heading,
                        'subheading': '<h2 class="subheading">'+data.data.shortDesc+'</h2><span class="meta">Posted by <a href="#">' + data.data.name + '</a> on ' + data.data.created + '</span>',
                        'bkImg': 'post-bg.jpg'
                    };
                } else {
                    $location.path('404');
                }
            });
        });


app.filter("sanitize", ['$sce', function ($sce) {
        return function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };
    }]);