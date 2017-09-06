angular
.module('pokemon')
.service('PokemonService', PokemonService);

PokemonService.$inject = ['Pokemon', 'Spot', '$rootScope'];
function PokemonService(Pokemon, Spot, $rootScope) {
  const self = this;

  self.getPokemon = function() {
    wipePokemonSpots();
  };

  function wipePokemonSpots() {
    let counter = 0;
    Pokemon
    .query()
    .$promise
    .then(res => {
      const pokemonIndexArray = res;
      setTimeout(function() {
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
      }, 200);
    });
  }

  function choosePokemon() {
    console.log('running');
    const id = Math.floor(Math.random() * 150) + 1;
    const pokemon = Pokemon.get({id: id});

    self.selectedPokemon = pokemon;
    $rootScope.$broadcast('pokemonSelected');

    setTimeout(function() {
      assignPokemonToSpot(pokemon);
    }, 200);
  }

  function assignPokemonToSpot(pokemon) {
    const id = Math.floor(Math.random() * 11) + 1;
    pokemon.spot_id = id;
    Pokemon.update({ id: pokemon.id }, { pokemon: pokemon });
  }
}
