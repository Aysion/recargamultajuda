(function(angular) {
  "use strict";

  angular.module('appRMA')
  .config(loginConfig);

  loginConfig.$inject = ['$stateProvider'];

  function loginConfig($stateProvider) {

    $stateProvider.state({
      name: 'login',
      url: '/login',
      template: '<ui-view></ui-view>',
      controller: 'LoginCtrl',
      controllerAs: 'ctrl'
    });

    $stateProvider.state({
      name: 'login.logar',
      url: '/logar',
      templateUrl: '/app/login/view/logar.tmpl.htm',
      controller: 'LogarCtrl',
      controllerAs: 'ctrl'
    });

    $stateProvider.state({
      name: 'login.cadastrar',
      url: '/cadastrar/:id?',
      templateUrl: '/app/login/view/cadastrar.tmpl.htm',
      controller: 'CadastroCtrl',
      controllerAs: 'ctrl'
    });

  };


})(angular);
