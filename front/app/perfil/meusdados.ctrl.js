(function(angular) {
  "use strict";

  angular.module('appRMA')
  .controller('MeusdadosCtrl', MeusdadosCtrl);

  MeusdadosCtrl.$inject = [
    '$state', '$localStorage', 'loginControlService', 'httpService'
  ];

  function MeusdadosCtrl(
    $state, $localStorage, loginControlService, httpService
  ) {
    var ctrl = this;

    ctrl.loginControl = loginControlService;

    ctrl.data = angular.copy($localStorage.userData);
    ctrl.hostname = window.location.origin + '/#!/login/cadastrar/' + ctrl.data.id;

    ctrl.submit = function(data) {
      httpService.post('perfil/salvar', data).then(function(resolveData) {
        if (resolveData && !resolveData.err) {
          $localStorage.userData = resolveData;
        }
      });
    };

  }
})(angular);
