(function(angular) {
  "use strict";

  angular.module('appRMA')
  .controller('AdminPendingRechargeCtrl', AdminPendingRechargeCtrl);

  AdminPendingRechargeCtrl.$inject = [
    '$state', '$sessionStorage', 'adminLoginControlService', 'httpService'
  ];

  function AdminPendingRechargeCtrl(
    $state, $sessionStorage, adminLoginControlService, httpService
  ) {
    var ctrl = this;

    ctrl.adminLoginControl = adminLoginControlService;

    ctrl.data = angular.copy($sessionStorage.userData);

    httpService.post('admin/pendingRecharge', ctrl.data).then(function(resolveData) {
      ctrl.pendings = resolveData;
    });

    ctrl.confirmRecharge = function(id) {

      httpService.post('admin/confirmRecharge', {id:id}).then(function(resolveData) {
        ctrl.pendings = resolveData;
      });
    }
  }
})(angular);
