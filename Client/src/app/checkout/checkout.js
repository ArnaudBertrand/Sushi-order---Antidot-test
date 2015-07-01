(function(){

  angular
      .module( 'app.checkout', [
        'ui.router'
      ])
      .config(config)
      .controller('CheckoutCtrl',CheckoutCtrl)
      .factory('OrderRsc',OrderRsc);

  config.$inject = ['$stateProvider'];
  function config( $stateProvider ) {
    $stateProvider.state( 'checkout', {
      url: '/checkout',
      params: {sushis: []},
      views: {
        "main": {
          controller: 'CheckoutCtrl',
          controllerAs: 'checkout',
          templateUrl: 'checkout/checkout.tpl.html'
        }
      },
      data:{ pageTitle: 'Checkout' }
    });
  }

  CheckoutCtrl.$inject = ['$state','$stateParams','OrderRsc'];
  function CheckoutCtrl( $state,$stateParams,OrderRsc ) {
    var vm = this;
    vm.customer = {name:'', address:'', tel:''};
    vm.process = process;

    function process(){
      vm.dataLoading = true;
      OrderRsc.saveAndGetId({customer: vm.customer, sushis: $stateParams.sushis}).$promise.then(function(res){
        $state.go('status',{id: res.id});
      }, function(err){
        if(err.status === 503 || err.status === 404){
          vm.error = err.data.error.type + ' - ' + err.data.error.message;
        } else if(err.status === 0){
          vm.error = 'You lost connexion to the server, check your connexion or contact an administrator';
        } else {
          console.log(err);
        }
        vm.dataLoading = false;
      });
    }
  }

  OrderRsc.$inject = ['$resource'];
  function OrderRsc ($resource){
    return $resource('http://localhost:3000/order',
        {},
        {'saveAndGetId': {
          method:'POST',
          transformResponse: function (data) {
            var res = data;
            try{
              res = JSON.parse(data);
            } catch (err){
              res = {id: data};
            }
            return res;
          }
        }}
    );
  }
})();

