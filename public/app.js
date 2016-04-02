angular.module('omdbSort', ['ngTable'])
.controller('omdb', function($scope, $http, $filter, NgTableParams) {

  $scope.ombdTable = new NgTableParams({}, {
    getData: function($defer, params) {
      return $http.get('http://www.omdbapi.com/?t=' + $scope.search)
      .then(function(response) {
        console.log(response.data);
        var filteredData = $filter('filter')(response.data.title, params.filter());
        var sortedData = $filter('orderBy')(filteredData, params.orderBy());
        return sortedData;
      });
    }
  });

  $scope.loadMovie = function() {
    $scope.ombdTable.reload();
  }

});