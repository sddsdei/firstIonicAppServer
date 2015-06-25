// Declare app level module which depends on filters, and services
app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
                when('/', {
                    templateUrl: '/view/admins/index.html'
                }).
                when('/userList', {
                    templateUrl: '/view/admins/userList.html',
                    controller: 'userListCtrl'
                }).
                when('/viewUser/:id', {
                    templateUrl: '/view/admins/viewUser.html',
                    controller: 'viewUserCtrl'
                }).
                when('/addUser', {
                    templateUrl: '/view/admins/addUser.html',
                    controller: 'addUserCtrl'
                }).
                when('/addUser/:id', {
                    templateUrl: '/view/admins/addUser.html',
                    controller: 'viewUserCtrl'
                }).
                when('/storyList', {
                    templateUrl: '/view/admins/storyList.html',
                    controller: 'storyListCtrl'
                }).
                when('/viewStory/:id', {
                    templateUrl: '/view/admins/viewStory.html',
                    controller: 'viewStoryCtrl'
                }).
                when('/addStory', {
                    templateUrl: '/view/admins/addStory.html',
                }).
                when('/addStory/:id', {
                    templateUrl: '/view/admins/addStory.html',
                    controller: 'viewStoryCtrl'
                }).
                when('/search', {
                    templateUrl: '/view/admins/list.html',
//                    controller: 'searchCtrl'
                }).
                otherwise({
                    templateUrl: '/view/404.html'
                });
    }]);