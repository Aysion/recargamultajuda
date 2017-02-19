(function(angular) {
  "use strict";

  angular.module('appRMA')
  .controller('LogarCtrl', LogarCtrl);

  LogarCtrl.$inject = [
    '$state', 'loginControlService', 'httpService'
  ];

  function LogarCtrl($state, loginControlService, httpService) {
    var ctrl = this;

    ctrl.loginControl = loginControlService;

    ctrl.data = {};

    ctrl.logar = function(data) {
      httpService.post('login/logar', data).then(function(resolveData) {
        ctrl.loginControl.logar(resolveData).then(function(resolveLogar) {
          if (resolveLogar.isLogged) {
            $state.go('perfil.user');
          }
        });
      });
    };

  }
})(angular);
