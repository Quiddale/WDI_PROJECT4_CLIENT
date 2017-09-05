angular
.module('pokemon')
.config(Router);

Router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

function Router($stateProvider, $locationProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/js/views/home.html',
    controller: 'HomeCtrl',
    controllerAs: 'vm'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/js/views/register.html',
    controller: 'RegisterCtrl',
    controllerAs: 'register'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/js/views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  })
  .state('userShow', {
    url: '/users/:id',
    templateUrl: '/js/views/users/show.html',
    controller: 'UsersShowCtrl as vm'
  })
  .state('worldsIndex',{
    url: '/worlds',
    templateUrl: '/js/views/world/index.html',
    controller: 'WorldsIndexCtrl',
    controllerAs: 'vm'
  })
  .state('worldsShow',{
    url: '/worlds/:id',
    templateUrl: '/js/views/world/show.html',
    controller: 'WorldsShowCtrl',
    controllerAs: 'vm'
  });

  $urlRouterProvider.otherwise('/');
}
