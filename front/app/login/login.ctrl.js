(function(angular) {
  "use strict";

  angular.module('appRMA')
  .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = [
    '$state', 'loginControlService'
  ];

  function LoginCtrl($state, loginControlService) {
    var ctrl = this;

    ctrl.loginControl = loginControlService;

    if (ctrl.loginControl.isLogged) {
      $state.go('perfil.user');
    }
  }
})(angular);
