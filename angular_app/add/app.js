angular.module("app")
    .controller('Dropdownctrl',function($http,$scope, Dropservice) {

        $scope.states = [];
        $scope.getStates = function () {
            debugger
            Dropservice.getStates(function (response) {
                if (response.status == 200){
                    $scope.states = response.data;
                }
            });
        }
        $scope.getStates();
        // $scope.states=Dropservice.getStates();
        alert($scope.states);

    }).factory('Dropservice',function($http,$q) {

        var service={};

        service.getStates=function(callback){
             $http.get('http://localhost:8000/state').then(function(resp) {
              callback(resp);
            });

        };
        return service;
});




