(function(angular) {
  "use strict";

  angular.module('appRMA')
  .controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = [
    'adminLoginControlService', '$sessionStorage', '$state'
  ];

  function AdminCtrl(
    adminLoginControlService, $sessionStorage, $state
  ) {
    var ctrl = this;

    ctrl.adminLoginControl = adminLoginControlService;

    if (!ctrl.adminLoginControl.isLogged) {
      $state.go('admin.login');
    } else {
    }
  }
})(angular);
