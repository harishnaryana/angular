'use strict';

/**
 * @ngdoc overview
 * @name engagementCenterApp
 * @description
 * # engagementCenterApp
 *
 * Main module of the application.
 */
var engagementCenterApp=angular.module('engagementCenterApp', [ 
    'ngRoute', 
    'datatables', 
    'ui.bootstrap', 
    'ui.calendar', 
    'ngAnimate', 
    'ui.mask', 
    'ui.router',
    'as.sortable'
  ])
 engagementCenterApp.config(function ($stateProvider,$routeProvider,$urlRouterProvider) {
     
      

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/enrollments/enrollmentSummary.html',
                })

            .state('login', {
                url: '/login',
                templateUrl: 'views/login/login.html'
            })

            .state('enrollments', {
                url: '/enrollments',
                templateUrl: 'views/enrollments/enrollments.html'
            })

            .state('participant', {
                url: '/participants/:participantId',
                templateUrl: 'views/participants/participant.html',
            })

            .state('enroll', {
                url: '/enrollments/add',
                templateUrl: 'views/enrollments/add/enroll.html'
            })

            .state('enroll.pathway', {
                templateUrl: 'views/enrollments/add/pathway.html'
            })

            .state('enroll.participant-personal-info', {
                templateUrl: 'views/enrollments/add/participant-personal-info.html'
            })

            .state('enroll.participant-address', {
                templateUrl: 'views/enrollments/add/participant-address.html'
            })

            .state('enroll.participant-coordinator', {
                templateUrl: 'views/enrollments/add/participant-coordinator.html'
            })
        
        $urlRouterProvider.otherwise('/login');
     
  });


engagementCenterApp.controller('mainCtrl',['$scope', '$rootScope','$location', function($scope, $rootScope,$location) {
  
    $rootScope.firstName="demo";
    $rootScope.authenticated=false;
    
        $scope.logout = function(item, event)
            {
                $location.path('/login');
                 $rootScope.firstName="";
                $rootScope.authenticated=false;
            }

}]);