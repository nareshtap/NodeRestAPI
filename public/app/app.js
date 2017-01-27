var app = angular.module('myApp', ['ngResource']);

app.factory('Product', function($resource) {
  return $resource('/api/products/:id');
});

app.controller('ProductsCtrl', function($scope, Product) {
    $scope.product = new Product();
    var refresh = function() {
        $scope.products = Product.query();
    };
    refresh();
});