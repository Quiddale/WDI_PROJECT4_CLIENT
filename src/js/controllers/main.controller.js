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
  });

  $rootScope.$on('loggedOut', () => {
    vm.user = null;
    $state.go('login');
  });

  function logout() {
    CurrentUserService.removeUser();
  }

}
