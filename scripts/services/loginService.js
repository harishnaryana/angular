'use strict';
engagementCenterApp.service('loginService', ['$http', '$q', function($http, $q) {

       var LOGIN_URL = "mock/login.js";
    
        this.getLoginData = function(userName) {console.log('service called',userName);
          // var LOGIN_URL =  getBaseUrl() + "/engagement-center-core-0.0.5/user/"+userName;
            var deferred = $q.defer();
        return    $http.get(LOGIN_URL)
                    .success(function(response) {
                        console.log('succcess', response);
                        deferred.resolve(response);
                    }).error(function(error) {
                        console.log('fail',error);
                         deferred.reject(error);
                    });
            return deferred.promice;
        };
    }]);