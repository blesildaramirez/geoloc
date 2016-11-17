'use strict';

angular.module('geolocApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('store-list', {
        url: '/stores',
        template: '<store-list></store-list>'
      });
  });
