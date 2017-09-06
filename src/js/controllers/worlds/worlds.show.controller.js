angular
.module('pokemon')
.controller('WorldsShowCtrl', WorldsShowCtrl);

WorldsShowCtrl.$inject = ['World', '$stateParams', '$scope', 'Pokemon', 'PokemonService', 'CurrentUserService', '$state'];
function WorldsShowCtrl(World, $stateParams, $scope, Pokemon, PokemonService, CurrentUserService, $state) {
  const vm = this;

  World
    .get({id: $stateParams.id })
    .$promise
    .then(res => {
      vm.world = res;
          console.log(vm.world);
    });


  vm.checkForPokemon = checkForPokemon;

  function checkForPokemon(spot) {
    const parentPokemon = $scope.$parent.main.selectedPokemon;

    if (spot.pokemon.toString() === parentPokemon.toString()) {
      console.log('Caught the pokemon');

      parentPokemon.user_ids.push(CurrentUserService.currentUser.id);

      Pokemon
        .update({ id: parentPokemon.id }, { pokemon: parentPokemon })
        .$promise
        .then(() => {
          PokemonService.getPokemon();
          $state.go('worldsIndex');
        });
    }
  }
}
