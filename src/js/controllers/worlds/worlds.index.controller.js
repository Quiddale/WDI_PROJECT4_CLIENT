angular
.module('pokemon')
.controller('WorldsIndexCtrl', WorldsIndexCtrl);

WorldsIndexCtrl.$inject = ['World', 'CurrentUserService', '$rootScope'];
function WorldsIndexCtrl(World, CurrentUserService, $rootScope) {
  const vm = this;

  $rootScope.$on('pokemonCaught', (event, args) => {
    vm.caughtPokemon.push(args.pokemon);
  });

  World
  .query()
  .$promise
  .then(data => {
    vm.worlds = data;
    // console.log(CurrentUserService.currentUser);
    vm.caughtPokemon = CurrentUserService.currentUser.pokemons;
    console.log(vm.caughtPokemon);
  });
  
}
