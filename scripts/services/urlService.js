'use strict';

angular.module('engagementCenterApp')
  .factory('urlService', function() {
    var bIsFixture = false;

    var _urlsObj = {
      "ENROLLMENT_ADD": "engagement-center-core-0.0.5/whp/whp/enrollment"
    };

    var ofixtures = {
      'GET_ALERTS': 'fixtures/alerts.json'
    };
    var _partials = {

    };
    /**uncomment this line for local development**/
    var _serviceRoot = 'http://qa1.whplabs.com:8080/';
    /**comment the below line for when pushing the code to server/deployment **/
    //var _serviceRoot = '/';
    return {
      service: function(serviceName) {
        return bIsFixture ? '/scripts/' + ofixtures[serviceName] : _serviceRoot + _urlsObj[serviceName];
      },
      view: function(viewName) {
        return _partials[viewName];
      },
      fixture: function(fixturename) {
        return ofixtures[fixturename];
      }
    };
  });