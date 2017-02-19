(function(angular) {
  "use strict";

  angular.module('appRMA')
  .controller('PayCtrl', PayCtrl);

  PayCtrl.$inject = [
    "$localStorage", "loginControlService", "Upload", "httpService"
  ];

  function PayCtrl(
    $localStorage, loginControlService, Upload, httpService
  ) {
    var ctrl = this;
    ctrl.userData = angular.copy($localStorage.userData);

    ctrl.opts = {
      whats: ctrl.userData.opts.whats
    };

    ctrl.loginControl = loginControlService;

    ctrl.submit = function() {

      if (ctrl.file) {
        ctrl.upload(ctrl.file);
      } else
      if (ctrl.opts.whats) {
        httpService.post('perfil/upload', {
          id: ctrl.userData.id,
          opts: ctrl.opts
        }).then(function(resp) {
          ctrl.userData.hasReceipt = resp.has;

          $localStorage.userData.hasReceipt = resp.has;
          $localStorage.userData.opts       = resp.opts;
        });
      }
    };

    ctrl.upload = function(file) {
      Upload.upload({
        url: 'api/perfil/upload',
        data: {
          file: file,
          id: ctrl.userData.id,
          opts: ctrl.opts
        }
      }).then(function (resp) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);

        ctrl.userData.hasReceipt = resp.data.has;

        $localStorage.userData.hasReceipt = resp.data.has;
      }, function (resp) {
        console.log('Error status: ' + resp.status);
      }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    };
  }
})(angular);
