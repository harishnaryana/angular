'use strict';
engagementCenterApp.service('participantService', ['$http',
function participantService($http) {
    var baseUrl = "/mock/participant.js";

    this.setBaseUrl = function (value) {
        baseUrl = value;
    }
    this.getBaseUrl = function () {
        return baseUrl;
    }

    this.getParticipantById = function (participantId) {
        var url = baseUrl + "?participantId=" + participantId;
        var returnValue = $http.get(url);
        return returnValue;
    }

}]);