 'use strict';

 engagementCenterApp.controller("EnrollmentsController", ['$http', '$location', '$routeParams', 'DTOptionsBuilder', '$rootScope',
   function($http, $location, $routeParams, DTOptionsBuilder, $rootScope) {
     var vm = this;

    var LIST_ENROLLMENTS_URL = "mock/listEnrollments.js";
     //var LIST_ENROLLMENTS_URL =  getBaseUrl() + "/engagement-center-core-0.0.5/whp/whp/enrollment";
     vm.enrollments = [];

     $http.get(LIST_ENROLLMENTS_URL)
       .then(function(response) {
           console.log('succcess', response);
           vm.enrollments = response.data;
         },
         function(response) {
           console.log('fail', response)
         }
     );

     activate();

     function activate() {}

     vm.showDetail = function(participantId) {
       console.log(participantId);
       $location.path('/participants/' + participantId);
     }
   }
 ]);