'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {

  //SETUP
  //limit to 10 items in the worklist
  var worklistURL = 'https://vna.hackathon.siim.org/dcm4chee-arc/qido/DCM4CHEE/studies/?00100010=SIIM&includefield=ALL&limit=10',
      dcmMapping = {
          '00080050': 'accession',
          '00080061': 'modality',
          '00100010': 'name',
         '00100020' : 'mrn',
         '00080020' : 'date',
         '00080030' : 'time',
         '00101010' : 'age',
          '00081030': 'procedure'
        };

  $scope.showworklist = true;
  $(".spinner").show();
  //END SETUP

  $http.get(worklistURL).success(function(data){
    var worklist = [];

    //iterate over the worklist and create data
    _.each(data, function(item){
      var worklistItem = {};
      //map the dicom fields
      _.each(_.pick(item, '00080050', '00080061', '00100010', '00100020', '00080020', '00080030', '00101010', '00081030'), function(inner, key){
        worklistItem[dcmMapping[key]] = _.first(inner.Value);
      });

      //modify the name
      if ( worklistItem.name ){
        worklistItem.name = worklistItem.name.Alphabetic.replace("^",", ");
      }
      worklist.push(worklistItem);
    });

    if (worklist.length > 0){
      $scope.worklist = worklist;
    }
    $(".spinner").hide();
  });

  //TODO use ng-click.
  $(".showWorklist").click(function(){
    $scope.showworklist = true;
    $scope.$apply();
  });

  //TODO use ng-click.
  $(".completeReport").click(function(){
    $scope.hideTemplate= true;
    $scope.$apply();

    var report = [];
    _.each($("section label"), function(item){
      var id = $(item).attr("for");
      report.push({
        "name" : $("#"+id).attr("name"),
        "value": $("#"+id).val()
      });
    });

    $scope.report = report;
    $scope.showReport = true;
    $scope.$apply();
  });

  //Select one of the worklist items
  $scope.selectWorkItem = function(workItem){
    var items = _.filter($scope.specialties, function(specialty){
      return specialty.specialty == workItem.modality
    })

    if (items.length > 0 ){
      $scope.selectedSpecialtyId = _.first(items).specialty;
    } else {
      $scope.selectedSpecialtyId = _.first($scope.specialties).specialty;
    }

    $scope.updateTemplates();
    $scope.selectedWorkItem = workItem;
    $scope.showworklist = false;
  }

  //Fetch specialties
  $http.get('http://127.0.0.1:1337/json/specialty/').success(function(data) {
    $scope.specialties = data.response.specialties;
    $scope.selectedSpecialtyId = _.first($scope.specialties).specialty;
  });

  //Fetch Templates for specialty
  $scope.updateTemplates = function(){
    $http.get('http://127.0.0.1:1337/json/?specialty=' + $scope.selectedSpecialtyId).success(function(data) {
      $scope.templates = data.response.template
    })
  };

  //Handle Template Selection
  $scope.updateSelectedTemplate = function(){
    $("#templateIframe").empty();
    $(".completeReport").hide();
    $(".spinner").show();

    $http.get('http://127.0.0.1:1337/json/template/?id=' + $scope.selectedTemplateId).success(function(data) {
      $("#templateIframe").empty()
      $("#templateIframe").append(data)
      $(".completeReport").show();
      $scope.showCompleteReport = true;
      $(".spinner").hide();
      $(".completeReport").show();
    })
  }
}]);
