angular
  .module('pokemon')
  .service('CurrentUserService', CurrentUserService);

CurrentUserService.$inject = ['User', 'TokenService', '$rootScope'];

function CurrentUserService(User, TokenService, $rootScope) {
  const self = this;

  self.getUser = () => {
    const decoded = TokenService.decodeToken();
    if (decoded) {
      User
        .get({ id: decoded.id })
        .$promise
        .then(data => {
          self.currentUser = data;
          $rootScope.$broadcast('loggedIn');
        });
    }
  };

  self.removeUser = () => {
    self.currentUser = null;
    TokenService.removeToken();
    $rootScope.$broadcast('loggedOut');
  };

  self.getUser();
}
