(function(angular) {
  "use strict";

  angular.module('appRMA')
  .controller('CadastroCtrl', CadastroCtrl);

  CadastroCtrl.$inject = [
    '$state', 'loginControlService', 'httpService', '$stateParams'
  ];

  function CadastroCtrl(
    $state, loginControlService, httpService, $stateParams
  ) {
    var ctrl = this;

    ctrl.loginControl = loginControlService;

    ctrl.data = {};
    ctrl.form = {
      affiliate: {
        readonly: false
      }
    }

    ctrl.data.affiliate = $stateParams.id || '';

    ctrl.form.affiliate.readonly = !!$stateParams.id;
    console.log($stateParams);

    ctrl.submit = function(data) {
      httpService.post('login/cadastro', data).then(function(resolveData) {
        ctrl.loginControl.logar(resolveData).then(function(resolveLogar) {
          if (resolveLogar.isLogged) {
            $state.go('perfil.user');
          }
        });
      });
    };

  }
})(angular);
