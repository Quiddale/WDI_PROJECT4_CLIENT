angular
.module('pokemon')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', 'CurrentUserService', '$state', 'PokemonService', '$scope'];

function MainCtrl($rootScope, CurrentUserService, $state, PokemonService, $scope) {
  const vm = this;
  vm.logout = logout;

  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.currentUser;
    PokemonService.getPokemon();
  });

  $rootScope.$on('pokemonSelected', () => {
    vm.selectedPokemon = PokemonService.selectedPokemon;
    console.log('THIS IS THE SELECTED POKEMON ASSIGNED IN THE MAIN CONTROLLER', vm.selectedPokemon);
  });

  $rootScope.$on('loggedOut', () => {
    vm.user = null;
    $state.go('login');
  });

  function logout() {
    CurrentUserService.removeUser();
  }

}
