

      'use strict';    
    engagementCenterApp.controller("LoginController",['$location','$rootScope','loginService','$scope', function($location,$rootScope,loginService, $scope) {
        var vm = this;

        vm.loginFormData = {};
        vm.loading = false;
        vm.postResult = 0;

        activate();

        function activate() { }

        vm.submit = function(item, event)
        {
            
            loginService.getLoginData(item.userName).then(function(response){
                console.log('frm login ctrl',response);
               if(response.status == 200){//success  
               // if(response.data.username == item.userName){
                      vm.loading = true;
            $location.path('/home');
            
             $rootScope.firstName=response.data.firstName;
             $rootScope.lastName=response.data.lastName;
            
            $rootScope.authenticated=true;
                }else {
                    $scope.loginError = "Invalid username or password";
                    $location.path('/login');
                }
          
            },function(error){
            	$scope.loginError = "Invalid username or password";
                $location.path('/login');
            }
                                                         );
            
             
        }
        
    
    }
]);

