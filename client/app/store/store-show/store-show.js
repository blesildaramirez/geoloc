'use strict';

angular.module('geolocApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('store-show', {
        url: '/stores/:id',
        template: '<store-show></store-show>'
      });
  });
