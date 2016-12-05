'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl as $ctrl'
  });
}])

.controller('HomeCtrl', ['Tea', function(Tea) {
  this.teas = Tea.popular();
}]);