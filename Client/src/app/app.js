(function(){
  'use strict';

  angular
      .module(
        'app', [
        'templates-app',
        'templates-common',
        'app.home',
        'app.check',
        'app.checkout',
        'app.status',
        'ngResource',
        'ui.router'
      ]).config(myAppConfig)
      .run(function run(){})
      .controller( 'AppCtrl', AppCtrl);

  myAppConfig.$inject = ['$urlRouterProvider'];
  function myAppConfig ( $urlRouterProvider ) {
    $urlRouterProvider.otherwise( '/home' );
  }

  AppCtrl.$inject = ['$scope'];
  function AppCtrl ( $scope ) {
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      if ( angular.isDefined( toState.data.pageTitle ) ) {
        $scope.pageTitle = toState.data.pageTitle + ' | SushiLuv ';
      }
    });
  }
})();
