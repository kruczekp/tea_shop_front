'use strict';

angular.module('myApp.teas', ['ngRoute', 'ngResource', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/teas', {
    templateUrl: 'teas/index.html',
    controller: 'TeasIndexCtrl as $ctrl'
  });
  $routeProvider.when('/teas/:id', {
    templateUrl: 'teas/show.html',
    controller: 'TeasShowCtrl as $ctrl'
  });
}])

.factory('Tea', ['$resource', function($resource) {
    return $resource('http://localhost:3000/v1/teas/:id', {}, {
      popular: {
        url: 'http://localhost:3000/v1/popular_teas',
        method: 'GET',
        isArray: true
      }
    });
  }
])

.controller('TeasIndexCtrl', ['$routeParams', '$location', 'Tea', function($routeParams, $location, Tea) {

  this.filters = $routeParams;
  if (!this.filters.order)
    this.filters.order = 'created_at_desc';

  this.teas = Tea.query(this.filters);
  
  this.update = function(){
    $location.search(this.filters);
    this.teas = Tea.query(this.filters);
  };
}])

.controller('TeasShowCtrl', ['$routeParams', 'Tea', 'Basket', '$cookies', function($routeParams, Tea, Basket, $cookies) {
  this.tea = Tea.get({id: $routeParams.id});

  this.addToBasket = function(){
    Basket.update({add: this.tea.id})
  }
}]);