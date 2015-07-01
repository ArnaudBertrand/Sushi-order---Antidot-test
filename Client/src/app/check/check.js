(function(){

  angular
      .module( 'app.check', [
        'ui.router'
      ])
      .config(config)
      .controller('CheckCtrl',CheckCtrl)
      .factory('StatusRsc',StatusRsc);

  config.$inject = ['$stateProvider'];
  function config( $stateProvider ) {
    $stateProvider.state( 'check', {
      url: '/check',
      views: {
        "main": {
          controller: 'CheckCtrl',
          controllerAs: 'check',
          templateUrl: 'check/check.tpl.html'
        }
      },
      data:{ pageTitle: 'Check order' }
    });
  }

  CheckCtrl.$inject = ['$state','StatusRsc'];
  function CheckCtrl( $state,StatusRsc ) {
    var vm = this;
    vm.confirmOrder = confirmOrder;
    vm.searchOrder = searchOrder;

    function confirmOrder (){
      if(vm.order){
        $state.go('status', {id: vm.order.orderId});
      }
    }

    function searchOrder (){
      vm.searchLoading = true;
      StatusRsc.get({orderId: vm.idToSearch}).$promise.then(function(order){
        vm.order = order;
      }, function (err) {
        if(err.status == 404){
          vm.error = err.data.error.type + ' - ' + err.data.error.message;
        } else if (err.status === 0) {
          vm.error = 'You lost connexion to the server, check your connexion or contact an administrator';
        } else {
          console.log(err);
        }
        vm.searchLoading = false;
      });
    }
  }

  StatusRsc.$inject = ['$resource'];
  function StatusRsc($resource) {
    return $resource('http://localhost:3000/status', {orderId: '@orderId'});
  }

})();

