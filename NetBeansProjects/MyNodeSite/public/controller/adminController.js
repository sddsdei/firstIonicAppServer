app.controller('indexCtrl', function ($http, $scope, $location) {
    $http({
        method: 'GET',
        url: '/admin/dashboard',
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
        url: '/admin/getLoginUserData',
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
        url: '/admin/userList',
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

app.controller('viewUserCtrl', function ($http, $location, $scope, $routeParams) {
    $http({
        method: 'GET',
        url: '/admin/viewUser/' + $routeParams.id,
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
            url: '/admin/addUser',
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
        url: '/admin/getUserList',
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
        url: '/admin/storyList',
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

app.controller('viewStoryCtrl', function ($http, $location, $scope, $routeParams) {
    $http({
        method: 'GET',
        url: '/admin/viewStory/' + $routeParams.id,
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

app.controller('addStoryCtrl', function ($http, $scope, $location) {
    getUserList($http, function (userList) {
        $scope.users = userList;
    });

    $scope.submit = function () {
        $http({
            method: 'POST',
            url: '/admin/addStory',
            data: $.param($scope.story), // pass in data as strings
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
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