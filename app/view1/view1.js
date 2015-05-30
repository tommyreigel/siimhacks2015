'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {

  var fhirURL = "http://fhir.hackathon.siim.org/fhir/",
      patientURL = fhirURL + "Patient/siimandy",
      reportsURL = fhirURL + "DiagnosticReport?subject=Patient/siimandy",
      studiesURL = "https://vna.hackathon.siim.org/dcm4chee-arc/qido/DCM4CHEE/studies/?00100020=TCGA-50-5072",
      worklistURL = 'https://vna.hackathon.siim.org/dcm4chee-arc/qido/DCM4CHEE/studies/?00100010=SIIM&includefield=ALL&limit=5'

  //limit to 5 items in the worklist
  //iterate over the worklist and create data
  //

  var dcmMapping = {
    '00080050': 'accession',
    '00080061': 'modality',
    '00100010': 'name',
   '00100020' :'mrn',
   '00080020' : 'date',
   '00080030' : 'time',
   '00101010' : 'age',
  'description': '00081030'
  }

  $http.get(worklistURL).success(function(data){
    _.each(data, function(item){
      var worklistItem = {};
      _.each(_.pick(item, '00080050', '00080061', '00100010', '00100020', '00080020', '00080030', '00101010', '00081030'), function(inner, key){
        worklistItem[dcmMapping[key]] = _.first(inner.Value);
      });
    });
    $scope.worklist.push(worklistItem)
  });

  var imagingStudyURL = fhirURL + 'ImagingStudy?accession=2508258761846499';
  $http.get(patientURL).success(function(data){
    $scope.patient = data
  });

  $http.get(studiesURL).success(function(data){
    //debugger

  });
  //
  $http.get(imagingStudyURL).success(function(data){
    debugger
    $scope.worklist = [data];
  })
  $http.get(reportsURL).success(function(data){
    debugger
          data.entry.sort(function (a,b) {
                  if (a.content.issued < b.content.issued)
                      return 1;
                  if (a.content.issued > b.content.issued)
                      return -1;
                  return 0;
              }
          );
  })


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
