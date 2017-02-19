(function(angular) {
  "use strict";

  angular.module('appRMA')
  .controller('AdminUserCtrl', AdminUserCtrl);

  AdminUserCtrl.$inject = [
    '$state', '$sessionStorage', 'adminLoginControlService', 'httpService'
  ];

  function AdminUserCtrl(
    $state, $sessionStorage, adminLoginControlService, httpService
  ) {
    var ctrl = this;

    ctrl.adminLoginControl = adminLoginControlService;

    ctrl.data = angular.copy($sessionStorage.userData);

    ctrl.submit = function(data) {
      httpService.post('admin/saveUser', data).then(function(resolveData) {
        if (resolveData && !resolveData.err) {
          $sessionStorage.userData = resolveData;
        }
      });
    };

  }
})(angular);
