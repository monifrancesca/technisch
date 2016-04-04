var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/word', {
      templateUrl: '/views/templates/word.html',
      controller: 'WordController'
    })
    .otherwise({
      redirectTo: 'word'
    });

}]);