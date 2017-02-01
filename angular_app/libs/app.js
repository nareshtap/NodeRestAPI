// Default colors
var brandPrimary =  '#20a8d8';
var brandSuccess =  '#4dbd74';
var brandInfo =     '#63c2de';
var brandWarning =  '#f8cb00';
var brandDanger =   '#f86c6b';

var grayDark =      '#2a2c36';
var gray =          '#55595c';
var grayLight =     '#818a91';
var grayLighter =   '#d1d4d7';
var grayLightest =  '#f8f9fa';

angular
    .module('app', [
        'ui.router',
        'oc.lazyLoad',
        'pascalprecht.translate',
        'ncy-angular-breadcrumb',
        'angular-loading-bar',
        'ngSanitize',
        'ngAnimate'
    ])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 1;
    }])
    .run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
        $rootScope.$on('$stateChangeSuccess',function(){
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
        $rootScope.$state = $state;
        return $rootScope.$stateParams = $stateParams;
    }])
    .controller('AddController',function($scope, AddService, $state) {
    $scope.employee = {};
    $scope.registration = function(reg) {


        AddService.savereg(reg).then(function(resolve){
            $state.go('app');
        });
    }
}).factory('AddService',function($http,$q) {
    return {
        savereg: function (registers) {
            var deferred = $q.defer();


           return $http.post('http://localhost:8000/register', registers, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })
        }
    }
});
