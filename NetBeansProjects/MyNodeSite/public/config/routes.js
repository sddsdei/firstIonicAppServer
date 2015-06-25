// Declare app level module which depends on filters, and services
app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
                when('/', {
                    templateUrl: '/view/allInOne/index.html',
                    controller: 'indexCtrl'
                }).
                when('/login', {
                    templateUrl: '/view/allInOne/login.html',
                    //controller: loginCtrl
                }).
                when('/signup', {
                    templateUrl: '/view/allInOne/signup.html',
                    //controller: signupCtrl
                }).
                when('/list', {
                    templateUrl: '/view/allInOne/list.html',
                    controller: 'listCtrl'
                }).
                when('/search', {
                    templateUrl: '/view/allInOne/list.html',
//                    controller: 'searchCtrl'
                }).
                when('/view/:id', {
                    templateUrl: '/view/allInOne/view.html',
                    //controller: signupCtrl
                }).
                when('/create', {
                    templateUrl: '/view/allInOne/create.html',
                    //controller: signupCtrl
                }).
                otherwise({
                    templateUrl: '/view/404.html'
//        redirectTo: '/view/404.html'
                });
    }]);