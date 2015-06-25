app.controller('indexCtrl', function ($http, $scope, $location) {
    $http({
        method: 'GET',
        url: WEBSERVICE_HTTP + '/admin/dashboard',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    }).success(function (data) {
        if (data.status == 200) {
            $scope.dashboardData = data.dashboardData;
        } else {
            $location.path('404');
        }
    });
});

app.controller('loginUserDataCtrl', function ($http, $scope, $location) {
    $http({
        method: 'GET',
        url: WEBSERVICE_HTTP + '/admin/getLoginUserData',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    }).success(function (data) {
        console.log(data);
        if (data.status == 200) {
            $scope.loginUserData = data.loginUserData;
        } else {
            $location.path('404');
        }
    });
});

app.controller('loginCtrl', function ($http, $scope, $location) {
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
});

app.controller('userListCtrl', function ($http, $location, $scope) {
    $http({
        method: 'GET',
        url: WEBSERVICE_HTTP + '/admin/userList',
        //data: $.param($scope.formData), // pass in data as strings
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    }).success(function (data) {
        if (data.status == 200) {
            $scope.users = data.fileData;
        } else {
            $location.path('404');
        }
    });
});

app.controller('viewUserCtrl', function ($http, $location, $scope, $stateParams) {
    $http({
        method: 'GET',
        url: WEBSERVICE_HTTP + '/admin/viewUser/' + $stateParams.id,
        //data: $.param($scope.formData), // pass in data as strings
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    }).success(function (data) {
        if (data.status == 200) {
            $scope.user = data.data;
        } else {
            $location.path('404');
        }
    });
});

app.controller('addUserCtrl', function (Upload, $scope, $location) {
    $scope.submit = function (user) {
        Upload.upload({
            url: WEBSERVICE_HTTP + '/admin/addUser',
            fields: user,
            file: user.profileimage
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data) {
            if (data == 'OK') {
                $location.path('userList');
            } else {
                alert('Error Occured');
                //$location.path('signup');
            }
        });
    };
});

app.controller('getUserList', function ($http, $scope) {
    $http({
        method: 'GET',
        url: WEBSERVICE_HTTP + '/admin/getUserList',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    }).success(function (data) {
        if (data.status == 200) {
            $scope.users = data.userList;
        } else {
            alert('Oops Error!');
            //$location.path('404');
        }
    });
});

app.controller('storyListCtrl', function ($http, $location, $scope) {
    $http({
        method: 'GET',
        url: WEBSERVICE_HTTP + '/admin/storyList',
        //data: $.param($scope.formData), // pass in data as strings
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    }).success(function (data) {
        if (data.status == 200) {
            $scope.stories = data.fileData;
        } else {
            $location.path('404');
        }
    });
});

app.controller('viewStoryCtrl', function ($http, $location, $scope, $stateParams) {
    $http({
        method: 'GET',
        url: WEBSERVICE_HTTP + '/admin/viewStory/' + $stateParams.id,
        //data: $.param($scope.formData), // pass in data as strings
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    }).success(function (data) {
        if (data.status == 200) {
            $scope.story = data.data;
        } else {
            $location.path('404');
        }
    });
});

app.controller('addStoryCtrl', function ($http, Upload, $scope, $location) {
    getUserList($http, function (userList) {
        $scope.users = userList;
    });

    $scope.submit = function (story) {
        Upload.upload({
            url: WEBSERVICE_HTTP + '/admin/addStory',
            fields: story,
//            file: user.profileimage
        }).success(function (data) {
            if (data == 'OK') {
                $location.path('storyList');
            } else {
                alert('Error Occured');
                //$location.path('signup');
            }
        });
    };
});

app.controller('searchCtrl', function ($http, $scope, $rootScope, $location) {
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
});

app.controller('viewCtrl', function ($http, $location, $scope, $routeParams) {
    $http({
        method: 'GET',
        url: '/view/' + $routeParams.id,
        //data: $.param($scope.formData), // pass in data as strings
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    }).success(function (data) {
        if (data.status == 200) {
            $scope.story = data.data;
        } else {
            $location.path('404');
        }
    });
});

app.controller('ContentController', function ($scope, $location, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.editStory = function (story_id) {
        $location.path('addStory/' + story_id);
    };
});




function getUserList($http, next) {
    $http({
        method: 'GET',
        url: WEBSERVICE_HTTP + '/admin/getUserList',
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
        url: WEBSERVICE_HTTP + '/admin/getCatList',
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
        url: WEBSERVICE_HTTP + '/admin/getSubCatList/' + cat_id,
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