angular.module("home", [])
    .config(['$stateProvider',function($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: "home/home.html",
        controller: "HomeController",
        resolve: {
            data: function($http) {
               $http.get("http://localhost:8089/employeelist");
            }
        }
        });
}]).controller("HomeController", function(data,$scope,$rootScope) {
    alert(data);
    $rootScope.record=[{"location":"India","name":"Jay","_id":"5880a56b39202a4d3e817b70","__v":0},{"location":"India","name":"Ankit","_id":"5880a629b86f154e3c639ab9","__v":0},{"location":"India","name":"Ankit","_id":"588192c9c00b8f107560652d","__v":0},{"location":"India","name":"Ankit","_id":"58819722f26efe11f29d380a","__v":0},{"__v":0,"_id":"5881a1cedaa7a415b819fd82","location":"New Zealand","name":"Ankit"},{"location":"dfsdfsdf","name":"adfsadf","_id":"5881ad61ba99381ad7eab20c","__v":0},{"name":"Ankit","occupation":"Developer","gender":"Male","age":23,"_id":"588ef4a0f1bbdb5c2c0ffd6b","__v":0}];
});
