(function(angular) {
  "use strict";

  angular.module('appRMA')
  .config(homeConfig);

  homeConfig.$inject = ['$stateProvider'];

  function homeConfig($stateProvider) {

    $stateProvider.state({
      name: 'home',
      url: '/home',
      templateUrl: '/app/home/view/home.tmpl.htm',
      controller: 'HomeCtrl',
      controllerAs: 'ctrl'
    });
  };

})(angular);
