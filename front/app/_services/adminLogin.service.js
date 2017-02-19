(function(angular) {
  angular.module('appRMA')
  .factory('adminLoginControlService', adminLoginControlService);

  adminLoginControlService.$inject = [
    '$sessionStorage', 'loginControlService'
  ];

  function adminLoginControlService(
    $sessionStorage, loginControlService
  ) {
    var that = {
      isLogged: false
    };

    var logged = function(data) {
      that.isLogged = $sessionStorage.userData != undefined;
    };

    var logar = function(data) {
      loginControlService.logout();

      return new Promise(function(resolve, reject) {
        if (!data.err && data.id) {

          $sessionStorage.userData = data;

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
      delete $sessionStorage.userData;

      that.isLogged = false;
    };

    logged();

    that.logged = logged;
    that.logar  = logar;
    that.logout = logout;

    return that;
  }
})(angular);
