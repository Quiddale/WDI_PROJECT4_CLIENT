angular
.module('pokemon')
.controller('WorldsShowCtrl', WorldsShowCtrl);

WorldsShowCtrl.$inject = ['World', '$stateParams', '$scope', 'Pokemon', 'PokemonService', 'CurrentUserService', '$state', '$rootScope'];
function WorldsShowCtrl(World, $stateParams, $scope, Pokemon, PokemonService, CurrentUserService, $state, $rootScope) {
  const vm = this;

  World
    .get({id: $stateParams.id })
    .$promise
    .then(res => {
      vm.world = res;
    });


  vm.checkForPokemon = checkForPokemon;

  function checkForPokemon(spot) {
    // const parentPokemon = $scope.$parent.main.selectedPokemon;
    console.log($scope);

    if (spot.pokemon.toString() === parentPokemon.toString()) {
      console.log('Caught the pokemon');

      if (parentPokemon.user_ids.indexOf(CurrentUserService.currentUser.id) === -1) {
        parentPokemon.user_ids.push(CurrentUserService.currentUser.id);
      }

      Pokemon
        .update({ id: parentPokemon.id }, { pokemon: parentPokemon })
        .$promise
        .then(() => {
          $rootScope.$broadcast('pokemonCaught', { pokemon: parentPokemon});
          PokemonService.getPokemon();
          $state.go('worldsIndex');
        });
    }
  }
}
