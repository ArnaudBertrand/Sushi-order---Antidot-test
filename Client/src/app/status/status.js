(function(){

  angular
      .module( 'app.status', [
        'ui.router'
      ])
      .config(config)
      .controller('StatusCtrl',StatusCtrl)
      .factory('StatusRsc',StatusRsc);

  config.$inject = ['$stateProvider'];
  function config( $stateProvider ) {
    $stateProvider.state( 'status', {
      url: '/status',
      params: {id: ''},
      views: {
        "main": {
          resolve:{
            orderPre: orderPre
          },
          controller: 'StatusCtrl',
          controllerAs: 'status',
          templateUrl: 'status/status.tpl.html'
        }
      },
      data:{ pageTitle: 'Status' }
    });
  }

  StatusCtrl.$inject = ['$interval','orderPre','StatusRsc'];
  function StatusCtrl( $interval,orderPre,StatusRsc ) {
    var vm = this;
    vm.getOrderStatus = getOrderStatus;
    vm.order = orderPre;

    init();

    function getOrderStatus (){
      var status = 'Your order is ';
      if(vm.order.status == 'busy'){
        status += 'currently in process and will be ready in approximately ' + vm.order.eta + 'mins.';
      } else {
        status += 'waiting for you.';
      }
      return status;
    }

    var timer;
    function init() {
      timer = $interval(timerTick,60000);
    }
    function timerTick (){
      if(vm.order.status == 'ready') {
        $interval.cancel(timer);
      }
      StatusRsc.get({orderId: vm.order.orderId}).$promise.then(function(order){
        vm.order = order;
      });
    }

  }

  StatusRsc.$inject = ['$resource'];
  function StatusRsc($resource) {
    return $resource('http://localhost:3000/status', {orderId: '@orderId'});
  }

  orderPre.$inject = ['$stateParams','StatusRsc'];
  function orderPre ($stateParams,StatusRsc){
    return StatusRsc.get({orderId: $stateParams.id}).$promise.then(function(order){
      return order;
    });
  }
})();

