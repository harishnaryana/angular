 'use strict';
 engagementCenterApp.controller("EnrollController", ['$location', '$http', '$state',
   function EnrollController($location, $http, $state) {
     /* jshint validthis:true */
     var vm = this;
     var GET_COORDINATORS_URL = "/mock/coordinators.js";
     var GET_PATHWAYS_URL = "/mock/pathways.js";
     var POST_ENROLLMENT_URL = getBaseUrl() +  '/engagement-center-core-0.0.5/whp/whp/enrollment/save';

     activate();

     function activate() {
       $state.transitionTo('enroll.pathway');
     }

     vm.title = 'enrollment_new';
     vm.enrollment = {};
     vm.participant = {};
     vm.participant.coordinators = [];
     vm.coordinators = [];
     vm.assignedCoordinators = [];
     vm.selectedCoordinator = {};


     $http.get(GET_COORDINATORS_URL)
       .then(function(response) {
         console.log('success getting coordinators', response);

         vm.coordinators = response.data;
       }, function(response) {
         console.log('error getting coordinators', response);
       });

     $http.get(GET_PATHWAYS_URL)
       .then(function(response) {
         console.log('success getting list of pathways', response);

         vm.pathways = response.data;
       }, function(response) {
         console.log('error getting list of pathways', response);
       });

     vm.addCoordinator = function() {
       console.log('adding coordinator', vm.selectedCoordinator);
       vm.assignedCoordinators.push(vm.selectedCoordinator);

       var selectedIndex = findCoordinatorIndexById(vm.coordinators, vm.selectedCoordinator.id);

       if (selectedIndex >= 0) {
         vm.coordinators.splice(selectedIndex, 1);
       }
     };

     vm.removeCoordinator = function(coordinator) {
       console.log('removing coordinator: ' + coordinator);

       var selectedIndex = findCoordinatorIndexById(vm.assignedCoordinators, coordinator.id);

       if (selectedIndex >= 0) {
         vm.assignedCoordinators.splice(selectedIndex, 1);
       }

       vm.coordinators.push(coordinator);
     };

     vm.enroll = function() {
       var enrollmentData = {};
       enrollmentData.enrollment = {};

       if (vm.enrollment.transactionId == null) {
         enrollmentData.enrollment.transactionId = generateUUID();
       }

       enrollmentData.enrollment.pathway = vm.enrollment.pathway;

       var startDate;
       if (vm.enrollment.startOn == null) {
         startDate = new Date();
         startDate.setDate(startDate.getDate() + 1);
       } else {
         startDate = vm.enrollment.startOn;
       }
       enrollmentData.enrollment.startOn = formatDateString(startDate);

       var endDate;
       if (vm.enrollment.endOn == null) {
         endDate = new Date(startDate);
         endDate.setDate(endDate.getDate() + 14);
       } else {
         endDate = vm.enrollment.endOn;
       }
       enrollmentData.enrollment.endOn = formatDateString(endDate);

       /* Need to take these out when the service is updated. */
       enrollmentData.enrollment.actualEndOn = enrollmentData.enrollment.endOn;
       enrollmentData.enrollment.endReason = "none";
       enrollmentData.enrollment.endReasonDetail = "none";
       enrollmentData.enrollment.completedOn = enrollmentData.enrollment.endOn;
       enrollmentData.enrollment.createdOn = formatDateString(new Date());
       enrollmentData.enrollment.updatedOn = enrollmentData.enrollment.createdOn;
       enrollmentData.enrollment.updatedBy = "me";

       if (vm.assignedCoordinators.length > 0) {
         vm.participant.coordinators = [];

         for (var coordinatorIndex = 0; coordinatorIndex < vm.assignedCoordinators.length; coordinatorIndex++) {
           vm.participant.coordinators.push({
             "phoneNumber": vm.assignedCoordinators[coordinatorIndex].phoneNumber,
             "contactOrder": coordinatorIndex + 1
           });
         }
       }
       enrollmentData.enrollment.participant = vm.participant;
       console.log("enrollmentData.enrollment.participant", enrollmentData.enrollment.participant)
       enrollmentData.enrollment.participant.contexts = [];

       console.log('enrollment', enrollmentData);

       $http.post(POST_ENROLLMENT_URL, enrollmentData)
         .then(function(response) {
           if (response.userMessage && response.userMessage != null && response.userMessage != "") {

           }
           //if success it will navigate to participants page
           $location.path('/participants/' + response.participantId);
           console.log('success posting enrollment', response);

         }, function(response) {
           vm.errorMessage = response.userMessage;
           console.log('error posting enrollment', response);
         });
     };

     function findCoordinatorIndexById(coordinators, coordinatorId) {
       var selectedIndex = -1;
       for (var coordinatorCount = 0; coordinatorCount < coordinators.length; coordinatorCount++) {
         if (coordinators[coordinatorCount].id === coordinatorId) {
           selectedIndex = coordinatorCount;
           break;
         }
       }

       return selectedIndex;
     };

     function generateUUID() {
       var d = new Date().getTime();
       var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
         var r = (d + Math.random() * 16) % 16 | 0;
         d = Math.floor(d / 16);
         return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
       });
       return uuid;
     }

     function formatDateString(date) {
       return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
     }

     //get the start on and end on  date
     vm.today = function() {
       var yesterday = new Date();
       yesterday.setHours(0, 0, 0, 0);
       yesterday.setDate(yesterday.getDate() - 1);
       vm.fromDate = yesterday;
       vm.toDate = new Date();
     };

     vm.fromDateOpen = function($event) {
       vm.status.fromOpened = true;
       vm.status.toOpened = false;
     };

     vm.toDateOpen = function($event) {
       vm.status.fromOpened = false;
       vm.status.toOpened = true;
     };
     vm.DOBDateOpen = function($event) {
       vm.status.dobOpened = true;

     };
     vm.dateOptions = {
       formatYear: 'yy',
       startingDay: 1
     };

     vm.formats = ['MM-dd-yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate'];
     vm.format = vm.formats[0];
     vm.dobFormat = vm.formats[1];
     vm.status = {
       fromOpened: false,
       toOpened: false,
       dobOpened: false
     };

     //setting the default start on and end on date
     vm.today();
   }
 ])