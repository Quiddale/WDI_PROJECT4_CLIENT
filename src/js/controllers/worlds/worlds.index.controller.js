angular
.module('pokemon')
.controller('WorldsIndexCtrl', WorldsIndexCtrl);

WorldsIndexCtrl.$inject = ['World'];
function WorldsIndexCtrl(World) {
  const vm = this;
  vm.worlds = World.query();
}
