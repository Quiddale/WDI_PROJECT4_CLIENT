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
    const pokemonArray = [];
    console.log('running');
    const id = Math.floor(Math.random() * 150) + 1;
    const pokemon = Pokemon.get({id: id});


    self.selectedPokemon = pokemon;
    pokemonArray.push(pokemon);
    $rootScope.$broadcast('pokemonSelected');

    for (var i = 0; i < 9; i++) {
      const id = Math.floor(Math.random() * 150) + 1;
      const pokemon = Pokemon.get({id: id});
      pokemonArray.push(pokemon);
    }

    setTimeout(function() {
      shuffle(pokemonArray);
      assignPokemonToSpots(pokemonArray);
    }, 200);
  }

  function assignPokemonToSpots(pokemonArray) {
    pokemonArray.forEach((pokemon, index) => {
      setTimeout(function() {
        pokemon.spot_id = index + 1;
        Pokemon.update({ id: pokemon.id }, { pokemon: pokemon });
      }, 500);
    });
  }

  function shuffle(a) {
    for (let i = a.length; i; i--) {
      const j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
  }
}
