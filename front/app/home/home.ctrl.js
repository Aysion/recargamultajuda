(function(angular) {
  "use strict";

  angular.module('appRMA')
  .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = [
    'loginControlService', 'adminLoginControlService'
  ];

  function HomeCtrl(
    loginControlService, adminLoginControlService
  ) {
    var ctrl = this;

    // loginControlService.logged(false);

    ctrl.loginControl = loginControlService;
    ctrl.adminLoginControl = adminLoginControlService;

    console.log(ctrl);
  }
})(angular);
