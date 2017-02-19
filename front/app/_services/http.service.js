(function(angular) {
  "use strict";

  angular.module('appRMA')
  .factory('httpService', httpService);

  httpService.$inject = [
    '$http'
  ];

  function httpService($http) {
    var that = this;

    that.post = function(url, data) {
      return requestResponse('post', url, data, {});
    };

    function requestResponse(method, url, data, params) {
      return $http({
        "method": method,
        "url": '/api/' + url,
        "data": data,
        "params": params
      }).then(function(resp) {
        return resp.data;
      }, function(ret) {
        console.error(ret);
      });
    }

    return that;
  }
})(angular);
