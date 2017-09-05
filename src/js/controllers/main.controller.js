angular
.module('pokemon')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', 'CurrentUserService', '$state', 'Pokemon', 'World'];

function MainCtrl($rootScope, CurrentUserService, $state, Pokemon, World) {
  const vm = this;
  vm.logout = logout;

  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.currentUser;


    wipePokemonSpots();
  });

  $rootScope.$on('loggedOut', () => {
    vm.user = null;
    $state.go('login');
  });

  function logout() {
    CurrentUserService.removeUser();
  }

  function wipePokemonSpots() {
    let counter = 0;
    Pokemon
      .query()
      .$promise
      .then(res => {
        const pokemonIndexArray = res;

        pokemonIndexArray.forEach((pokemon) => {
          pokemon.spot_id = 0;
          Pokemon
            .update({ id: pokemon.id }, { pokemon: pokemon })
            .$promise
            .then(() => {
              counter++;
              if(counter >= pokemonIndexArray.length) choosePokemon();
            });
        });
      });


  }

  function choosePokemon() {
    const id = Math.floor(Math.random() * 150) + 1;
    vm.selectedPokemon = Pokemon.get({id: id});

    chooseWorld();
  }

  function chooseWorld() {
    World
      .get({id: 4})
      .$promise
      .then(res => {
        const world = res;
        const index = Math.floor(Math.random() * world.spots.length);
        const spot = world.spots[index];

        vm.selectedPokemon.spot_id = spot.id;
        Pokemon
          .update({ id: vm.selectedPokemon.id }, { pokemon: vm.selectedPokemon })
          .$promise
          .then(res => console.log('THIS IS THE SELECTED POKEMON AFTER UPDATE!', res));
      });
  }

}
