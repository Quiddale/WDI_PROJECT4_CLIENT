angular.module('pokemon')
.factory('World', World);

World.$inject = ['API', '$resource'];
function World(API, $resource) {
  return $resource(`${API}/worlds/:id`, { id: '@_id'}, {
    'update': {method: 'PUT'}
  });
}
