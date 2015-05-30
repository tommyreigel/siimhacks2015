'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {
  $http.get('http://127.0.0.1:1337/json/specialty/').success(function(data) {
    $scope.specialties = data.response.specialties;
  });

  $scope.updateTemplates = function(){
    $http.get('http://127.0.0.1:1337/json/?specialty=' + $scope.selectedSpecialtyId).success(function(data) {
      $scope.templates = data.response.template
    })
  };

  $scope.updateSelectedTemplate = function(){
    $http.get('http://127.0.0.1:1337/json/template/?id=' + $scope.selectedTemplateId).success(function(data) {
      $("#templateIframe").empty()
      $("#templateIframe").append(data)
      $scope.selectedTemplate = _.first(data.response.template)
    })
  }
}]);
