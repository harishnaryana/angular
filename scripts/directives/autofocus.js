(function() {
    'use strict';

    angular
        .module('engagementCenterApp')
        .directive('autofocus', autofocus);

    autofocus.$inject = ['$window'];
    
    function autofocus ($window) {
        // Usage:
        //     <autofocus></autofocus>
        // Creates:
        // 
        var directive = {
            link: link
        };
        return directive;

        function link(scope, element, attrs) {
            setTimeout(function () {
                element[0].focus();
            }, 100);
        }
    }

})();