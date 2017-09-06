angular.module('pokemon')
.factory('Spot', Spot);

Spot.$inject = ['API', '$resource'];
function Spot(API, $resource) {
  return $resource(`${API}/spots/:id`, { id: '@_id'}, {
    'update': {method: 'PUT'}
  });
}
