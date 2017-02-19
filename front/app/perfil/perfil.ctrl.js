(function(angular) {
  "use strict";

  angular.module('appRMA')
  .controller('PerfilCtrl', PerfilCtrl);

  PerfilCtrl.$inject = [
    '$state', 'loginControlService'
  ];

  function PerfilCtrl($state, loginControlService) {
    var ctrl = this;

    ctrl.loginControl = loginControlService;

    if (!ctrl.loginControl.isLogged) {
      $state.go('login.logar');
    };
  }
})(angular);
