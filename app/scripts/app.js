'use strict';

/**
 * @ngdoc overview
 * @name interviewsExplorationApp
 * @description
 * # interviewsExplorationApp
 *
 * Main module of the application.
 */
angular
  .module('interviewsExplorationApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
