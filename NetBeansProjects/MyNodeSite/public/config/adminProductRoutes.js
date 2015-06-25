// Declare app level module which depends on filters, and services
app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
                when('/catList', {
                    templateUrl: '/view/adminProducts/catList.html',
                    controller: 'catListCtrl'
                }).
                when('/viewCat/:id', {
                    templateUrl: '/view/adminProducts/viewCat.html',
                    controller: 'viewCatCtrl'
                }).
                when('/addCat', {
                    templateUrl: '/view/adminProducts/addCat.html',
                    controller: 'addCatCtrl'
                }).
                when('/addCat/:id', {
                    templateUrl: '/view/adminProducts/addCat.html',
                    controller: 'viewCatCtrl'
                }).
                when('/subCatList', {
                    templateUrl: '/view/adminProducts/subCatList.html',
                    controller: 'subCatListCtrl'
                }).
                when('/viewSubCat/:id', {
                    templateUrl: '/view/adminProducts/viewSubCat.html',
                    controller: 'viewSubCatCtrl'
                }).
                when('/addSubCat', {
                    templateUrl: '/view/adminProducts/addSubCat.html',
//                    controller: 'addSubCatCtrl'
                }).
                when('/addSubCat/:id', {
                    templateUrl: '/view/adminProducts/addSubCat.html',
                    controller: 'viewSubCatCtrl'
                }).
                when('/prodList', {
                    templateUrl: '/view/adminProducts/prodList.html',
                    controller: 'prodListCtrl'
                }).
                when('/viewProd/:id', {
                    templateUrl: '/view/adminProducts/viewProd.html',
                    controller: 'viewProdCtrl'
                }).
                when('/addProd', {
                    templateUrl: '/view/adminProducts/addProd.html',
//                    controller: 'addSubCatCtrl'
                }).
                when('/addProd/:id', {
                    templateUrl: '/view/adminProducts/addProd.html',
                    controller: 'viewProdCtrl'
                }).
                otherwise({
                    templateUrl: '/view/404.html'
                });
    }]);