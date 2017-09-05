angular
.module('pokemon')
.controller('WorldsShowCtrl', WorldsShowCtrl);

WorldsShowCtrl.$inject = ['World', '$stateParams'];
function WorldsShowCtrl(World, $stateParams) {
  const vm = this;
  console.log($stateParams.id);
  vm.worlds = World.query();
  console.log(vm.worlds);
  World
    .get({id: $stateParams.id })
    .$promise
    .then(res => {
      vm.world = res;

      console.log(vm.world.spots);
    });
}
