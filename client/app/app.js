'use strict';

angular.module('geolocApp', [
    'geolocApp.auth',
    'geolocApp.admin',
    'geolocApp.constants',
    'google.places',
    'leaflet-directive',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap',
    'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider, $logProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    $logProvider.debugEnabled(false);
  });
