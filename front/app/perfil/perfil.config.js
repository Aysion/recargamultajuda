(function(angular) {
  "use strict";

  angular.module('appRMA')
  .config(perfilConfig);

  perfilConfig.$inject = ['$stateProvider'];

  function perfilConfig($stateProvider) {

    $stateProvider.state({
      name: 'perfil',
      url: '/perfil',
      template: '<ui-view></ui-view>',
      controller: 'PerfilCtrl',
      controllerAs: 'ctrl'
    });

    $stateProvider.state({
      name: 'perfil.user',
      url: '/meusdados',
      templateUrl: '/app/perfil/view/meusdados.tmpl.htm',
      controller: 'MeusdadosCtrl',
      controllerAs: 'ctrl'
    });

    $stateProvider.state({
      name: 'perfil.afiliados',
      url: '/afiliados',
      templateUrl: '/app/perfil/view/afiliados.tmpl.htm',
      controller: 'AfiliadosCtrl',
      controllerAs: 'ctrl'
    });

    $stateProvider.state({
      name: 'perfil.pay',
      url: '/pagamento',
      templateUrl: '/app/perfil/view/pay.tmpl.htm',
      controller: 'PayCtrl',
      controllerAs: 'ctrl'
    });

  };


})(angular);
