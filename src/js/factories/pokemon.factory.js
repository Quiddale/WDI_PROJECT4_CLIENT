angular.module('pokemon')
.factory('Pokemon', Pokemon);

Pokemon.$inject = ['API', '$resource'];
function Pokemon(API, $resource) {
  return $resource(`${API}/pokemons/:id`, { id: '@_id'}, {
    'update': {method: 'PUT'}
  });
}
