(function(angular) {
  "use strict";

  angular.module('appRMA', [
    'ui.router', 'ui.bootstrap', 'ngStorage', 'ngFileUpload'
  ]);

  //------------------------------------------------------------------------------

  angular.module('appRMA')
  .config(appConfigRouterProvider);

  appConfigRouterProvider.$inject = ['$urlRouterProvider'];

  function appConfigRouterProvider($urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
  }

  //------------------------------------------------------------------------------

  angular.module('appRMA')
  .config(appConfigLocalStorageProvider);

  appConfigLocalStorageProvider.$inject = ['$localStorageProvider'];

  function appConfigLocalStorageProvider($localStorageProvider) {

    $localStorageProvider.setKeyPrefix('rma');
  }

//------------------------------------------------------------------------------
  angular.module('appRMA')
  .controller('AppCtrl', AppCtrl);

  AppCtrl.$inject = [
    'loginControlService', 'adminLoginControlService'
  ];

  function AppCtrl(
    loginControlService, adminLoginControlService
  ) {
    var ctrl = this;

    ctrl.loginControl = loginControlService;
    ctrl.adminLoginControl = adminLoginControlService;

    ctrl.loginControl.logged();
  }
})(angular);
//------------------------------------------------------------------------------

document.body.onresize = onresize;

function onresize() {
  var menu = document.getElementById('menu').offsetHeight;
  var footer = document.getElementById('footer').offsetHeight;

  var height = window.innerHeight - (menu + footer + 90);
  console.log(height);

  if (document.getElementById('myDiagramDiv')) {
    document.getElementById('myDiagramDiv').style.height = height + 'px';
  } else {
    // setTimeout(onresize, 600);
  }
};

// onresize();
