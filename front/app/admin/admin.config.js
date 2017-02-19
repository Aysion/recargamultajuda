(function(angular) {
  "use strict";

  angular.module('appRMA')
  .config(adminConfig);

  adminConfig.$inject = ['$stateProvider'];

  function adminConfig($stateProvider) {

    $stateProvider.state({
      name: 'admin',
      url: '/admin',
      templateUrl: '/app/admin/view/admin.tmpl.htm',
      controller: 'AdminCtrl',
      controllerAs: 'ctrl'
    });

    $stateProvider.state({
      name: 'admin.login',
      url: '/login',
      templateUrl: '/app/admin/view/login.tmpl.htm',
      controller: 'AdminLoginCtrl',
      controllerAs: 'ctrl'
    });

    $stateProvider.state({
      name: 'admin.user',
      url: '/meusdados',
      templateUrl: '/app/admin/view/meusdados.tmpl.htm',
      controller: 'AdminUserCtrl',
      controllerAs: 'ctrl'
    });

    $stateProvider.state({
      name: 'admin.pending',
      url: '/pendente',
      templateUrl: '/app/admin/view/pending.tmpl.htm',
      controller: 'AdminPendingCtrl',
      controllerAs: 'ctrl'
    });

    $stateProvider.state({
      name: 'admin.recharge',
      url: '/pendenteRecarga',
      templateUrl: '/app/admin/view/pendingRecharge.tmpl.htm',
      controller: 'AdminPendingRechargeCtrl',
      controllerAs: 'ctrl'
    });

  };

})(angular);
