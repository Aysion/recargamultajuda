(function(angular) {
  angular.module('appRMA')
  .factory('loginControlService', loginControlService);

  loginControlService.$inject = ['$localStorage'];

  function loginControlService($localStorage) {
    var that = {
      isLogged: false
    };

    var logged = function(data) {
      if ($localStorage.userData) {
        that.isLogged = true
      }
    };

    var logar = function(data) {
      return new Promise(function(resolve, reject) {
        if (!data.err && data.id) {
          $localStorage.userData = data;

          that.isLogged = true;

          resolve({
            isLogged: true
          });
        } else {
          reject(data);
        }
      });
    };

    var logout = function(data) {
      delete $localStorage.userData;

      that.isLogged = false;
    };

    that.logged   = logged;
    that.logar    = logar;
    that.logout   = logout;

    return that;
  }
})(angular);
