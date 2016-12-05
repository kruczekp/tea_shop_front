'use strict';

angular.module('myApp.basket', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/basket', {
    templateUrl: 'basket/basket.html',
    controller: 'BasketCtrl as $ctrl'
  });
}])

.factory('Basket', ['$resource', function($resource) {
    return $resource('http://localhost:3000/v1/basket', {}, {
      query: {
        method: 'GET',
        isArray: true,
        withCredentials: true
      },
      update: {
        method: 'PUT',
        withCredentials: true
      },
      delete: {
        method: 'DELETE',
        withCredentials: true        
      }
    });
  }
])

.controller('BasketCtrl', ['Basket', '$route', function(Basket, $route) {
  this.teas = Basket.query();

  this.destroy = function() {
    Basket.delete().$promise.then(function(){
      $route.reload();  
    });
  }
}]);
