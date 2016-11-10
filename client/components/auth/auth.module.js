'use strict';

angular.module('geolocApp.auth', ['geolocApp.constants', 'geolocApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
