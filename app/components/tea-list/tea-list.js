angular.module('myApp').
directive('teaList', function() {
  return {
    restrict: 'E',
    scope: {
      teas: '='
    },
    templateUrl: 'components/tea-list/tea-list.html'
  };
});