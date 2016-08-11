 'use strict';

 engagementCenterApp.controller("EnrollmentSummaryController", ['$http', '$location', '$routeParams', 'DTOptionsBuilder', '$rootScope', 'urlService',
   function($http, $location, $routeParams, DTOptionsBuilder, $rootScope, urlService) {
     var vm = this;

     vm.showenrollmentsSummaryGrid = true;
     vm.showEnrollmentActiveGrid = false;

     //api call for enrollment add
     var url = urlService.service('ENROLLMENT_ADD');
     console.log("====", url)


     /*active summary code */

     var LIST_ENROLLMENTS_URL = "mock/enrollmentSummary.js";
     // var LIST_ENROLLMENTS_URL =  getBaseUrl() + "/engagement-center-core-0.0.5/whp/whp/coordinator/enrollment";
     vm.enrollmentsSummary = [];

     $http.get(LIST_ENROLLMENTS_URL)
       .then(function(response) {
           console.log('succcess', response);
           vm.enrollmentsSummary = response.data;
         },
         function(response) {
           console.log('fail', response);

           /* remove once api fix */
           $http.get("mock/enrollmentSummary.js")
             .then(function(response) {
                 console.log('succcess', response);
                 vm.enrollmentsSummary = response.data;
               },
               function(response) {
                 console.log('fail', response)
               }
           );
           /* remove the code */
         }
     );

     /*active summary code ends*/





     /* active enrollmentsActive */

     vm.enrollmentsActive = [];

     vm.enrollmentsActiveJSONCall = function(EnrollmentParameters) {

       vm.showenrollmentsSummaryGrid = false;
       vm.lazLoader = true;
       $http({
         url: getBaseUrl() + '/engagement-center-core-0.0.5/whp/whp/enrollment',
         method: "GET",
         params: EnrollmentParameters
       }).then(function successCallback(response) {

         console.log('succcess', response);
         vm.enrollmentsActive = response.data;
         vm.showEnrollmentActiveGrid = true;
         vm.lazLoader = false;

       }, function errorCallback(response) {

         vm.showEnrollmentActiveGrid = true;
         vm.lazLoader = false;
         console.log('fail', response);


         /* remove the code when above sucesss*/

         $http.get("mock/listEnrollments.js")
           .then(function(response) {
               console.log('succcess', response);
               vm.enrollmentsActive = response.data;
             },
             function(response) {
               console.log('fail', response)
             }
         );

         /*end of the dummy call*/

       });;
     };

     vm.EnrollmentActiveParameters = {

     };

     vm.showEnrollmentActive = function() {

       vm.EnrollmentActiveParameters['status'] = "ACTIVE";

       if (arguments.length == 1) {
         vm.EnrollmentActiveParameters = {};
         vm.EnrollmentActiveParameters['coordinatorUserId'] = arguments[0];

       } else if (arguments.length == 2) {

         if (arguments[1] == "true") {
           //sending to get 7 days back data
           var date = moment().subtract(7, 'days').format('YYYY-MM-DD hh:mm:ss');

           console.log(date);
           vm.EnrollmentActiveParameters['createdOnOrAfter'] = date;
         }
       }

       console.log(vm.EnrollmentActiveParameters)
       //$location.path('/participants/' + participantId);

       vm.enrollmentsActiveJSONCall(vm.EnrollmentActiveParameters);
     }

     /*back button*/
     vm.back = function() {

       vm.showenrollmentsSummaryGrid = true;
       vm.showEnrollmentActiveGrid = false;
     }
     /* end active enrollmentsActive */

     vm.showDetail = function(participantId) {
       console.log(participantId);
       $location.path('/participants/' + participantId);
     }
   }
 ]);