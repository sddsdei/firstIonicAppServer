app.controller('catListCtrl', function ($http, $location, $scope) {
    $http({
        method: 'GET',
        url: '/admin/catList',
        //data: $.param($scope.formData), // pass in data as strings
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    }).success(function (data) {
        if (data.status == 200) {
            $scope.cats = data.fileData;
        } else {
            $location.path('404');
        }
    });
});

app.controller('viewCatCtrl', function ($http, $location, $scope, $routeParams) {
    $http({
        method: 'GET',
        url: '/admin/viewCat/' + $routeParams.id,
        //data: $.param($scope.formData), // pass in data as strings
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    }).success(function (data) {
        if (data.status == 200) {
            $scope.cat = data.data;
        } else {
            $location.path('404');
        }
    });
});

app.controller('addCatCtrl', function (Upload, $scope, $location) {
    $scope.submit = function (cat) {
        Upload.upload({
            url: '/admin/addCat',
            fields: cat,
            file: cat.catImage
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data) {
            if (data == 'OK') {
                $location.path('catList');
            } else {
                alert('Error Occured');
                //$location.path('signup');
            }
        });
    };
});

app.controller('getCatList', function ($http, $scope) {
    $http({
        method: 'GET',
        url: '/admin/getCatList',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    }).success(function (data) {
        if (data.status == 200) {
            $scope.cats = data.userList;
        } else {
            alert('Oops Error!');
            //$location.path('404');
        }
    });
});

app.controller('subCatListCtrl', function ($http, $location, $scope) {
    $http({
        method: 'GET',
        url: '/admin/subCatList',
        //data: $.param($scope.formData), // pass in data as strings
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    }).success(function (data) {
        if (data.status == 200) {
            $scope.subCats = data.fileData;
        } else {
            $location.path('404');
        }
    });
});

app.controller('viewSubCatCtrl', function ($http, $location, $scope, $routeParams) {
    $http({
        method: 'GET',
        url: '/admin/viewSubCat/' + $routeParams.id,
        //data: $.param($scope.formData), // pass in data as strings
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    }).success(function (data) {
        if (data.status == 200) {
            $scope.subCat = data.data;
        } else {
            $location.path('404');
        }
    });
});

app.controller('addSubCatCtrl', function ($http, Upload, $scope, $location) {
    getCatList($http, function (catList) {
        $scope.cats = catList;
    });

    $scope.submit = function (subCat) {
        Upload.upload({
            url: '/admin/addSubCat',
            fields: subCat,
            file: subCat.subCatImage
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data) {
            if (data == 'OK') {
                $location.path('subCatList');
            } else {
                alert('Error Occured');
                //$location.path('signup');
            }
        });
    };
});


app.controller('prodListCtrl', function ($http, $location, $scope) {
    $http({
        method: 'GET',
        url: '/admin/prodList',
        //data: $.param($scope.formData), // pass in data as strings
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    }).success(function (data) {
        if (data.status == 200) {
            $scope.products = data.fileData;
        } else {
            $location.path('404');
        }
    });
});

app.controller('viewProdCtrl', function ($http, $location, $scope, $routeParams) {
    $http({
        method: 'GET',
        url: '/admin/viewProd/' + $routeParams.id,
        //data: $.param($scope.formData), // pass in data as strings
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    }).success(function (data) {
        if (data.status == 200) {
            $scope.product = data.data;

            getSubCatList($http, data.data.cat_id, function (subCatList) {
                $scope.subCats = subCatList;
            });
        } else {
            $location.path('404');
        }
    });
});

app.controller('addProdCtrl', function ($http, Upload, $scope, $location) {
    getCatList($http, function (catList) {
        $scope.cats = catList;
    });

    $scope.changeList = function (cat_id) {
        getSubCatList($http, cat_id, function (subCatList) {
            $scope.subCats = subCatList;
        });
    };

    $scope.submit = function (product) {
        Upload.upload({
            url: '/admin/addProd',
            fields: product,
            file: product.prodImage
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data) {
            if (data == 'OK') {
                $location.path('prodList');
            } else {
                alert('Error Occured');
                //$location.path('signup');
            }
        });
    };
});