(function(angular) {
  "use strict";

  angular.module('appRMA')
  .controller('AdminLoginCtrl', AdminLoginCtrl);

  AdminLoginCtrl.$inject = [
    '$state', 'adminLoginControlService', 'httpService'
  ];

  function AdminLoginCtrl($state, adminLoginControlService, httpService) {
    var ctrl = this;

    ctrl.adminLoginControl = adminLoginControlService;

    ctrl.data = {};

    if (ctrl.adminLoginControl.isLogged) {
      $state.go('admin.user');
    }

    ctrl.logar = function(data) {
      httpService.post('admin/logar', data).then(function(resolveData) {
        ctrl.adminLoginControl.logar(resolveData).then(function(resolveLogar) {
          if (resolveLogar.isLogged) {
            $state.go('admin.user');
          }
        });
      });
    };

  }
})(angular);
