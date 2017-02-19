(function(angular) {
  "use strict";

  angular.module('appRMA')
  .config(HttpProvider);

  HttpProvider.$inject = ['$httpProvider'];

  function HttpProvider($httpProvider) {

    $httpProvider.interceptors.push([function () {
  		return {
  			request: function (config) {
  				config.headers = config.headers || {};
  				config.headers.Authorization = 'Token';

          console.log(config);
  				return config;
  			},
  			requestError: function(reject) {
  				return reject;
  			},
  			response: function(response) {
  				return response;
  			},
  			responseError: function (reject) {
  				return reject;
  			}
  		};
  	}]);
  }
})(angular);
