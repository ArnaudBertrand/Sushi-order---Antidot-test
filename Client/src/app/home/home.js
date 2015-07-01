(function(){

  angular
      .module( 'app.home', [
        'ui.router'
      ])
      .config(config)
      .controller('HomeCtrl',HomeCtrl);

  config.$inject = ['$stateProvider'];
  function config( $stateProvider ) {
    $stateProvider.state( 'home', {
      url: '/home',
      views: {
        "main": {
          controller: 'HomeCtrl',
          controllerAs: 'home',
          templateUrl: 'home/home.tpl.html'
        }
      },
      data:{ pageTitle: 'Home' }
    });
  }

  HomeCtrl.$inject = ['$state'];
  function HomeCtrl($state) {
    var vm = this;
    vm.checkout = checkout;
    vm.displayDetails = 0;
    vm.toggleSushiSelect = toggleSushiSelect;
    vm.sushis = [];

    initSushis();

    function checkout(){
      var sushis = [];
      vm.sushis.forEach(function(e){
        if(e.selected) {sushis.push(e.name);}
      });
      $state.go('checkout',{sushis: sushis});
    }

    function initSushis(){
      vm.sushis.push({name: "Hotategai", img: "assets/img/sushis/hotategai.jpg"});
      vm.sushis.push({name: "Kani", img: "assets/img/sushis/kani.jpg"});
      vm.sushis.push({name: "Tobiko", img: "assets/img/sushis/tobiko.jpg"});
      vm.sushis.push({name: "Unaghi", img: "assets/img/sushis/unaghi.jpg"});
    }

    function toggleSushiSelect(sushi){
      sushi.selected = !sushi.selected;
      if(sushi.selected){
        vm.displayDetails++;
      } else {
        vm.displayDetails--;
      }
    }

  }

})();

