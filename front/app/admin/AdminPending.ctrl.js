(function(angular) {
  "use strict";

  angular.module('appRMA')
  .controller('AdminPendingCtrl', AdminPendingCtrl);

  AdminPendingCtrl.$inject = [
    '$state', '$sessionStorage', 'adminLoginControlService', 'httpService'
  ];

  function AdminPendingCtrl(
    $state, $sessionStorage, adminLoginControlService, httpService
  ) {
    var ctrl = this;

    ctrl.adminLoginControl = adminLoginControlService;

    ctrl.data = angular.copy($sessionStorage.userData);

    httpService.post('admin/pending', ctrl.data).then(function(resolveData) {
      ctrl.pendings = resolveData;
    });

    ctrl.confirmPay = function(id) {
      // ctrl.pendings = ctrl.pendings.filter(function(item) {
      //   return item.id != id;
      // });

      httpService.post('admin/confirmPay', {id:id}).then(function(resolveData) {
        ctrl.pendings = resolveData;
        // console.log(resolveData);
      });
    }
  }
})(angular);
