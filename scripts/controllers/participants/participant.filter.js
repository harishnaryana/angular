'use strict';
engagementCenterApp.filter('phoneNumber', function () {
    return function formatPhoneNumber(phoneNumber) {
            var returnValue = "";
            if (phoneNumber != null &&
                phoneNumber.length >= 10) {
                returnValue = '(' + phoneNumber.substr(0, 3) + ')' +
                                phoneNumber.substr(3, 3) + '-' +
                                phoneNumber.substr(6);

            }
            return returnValue;
        };
});