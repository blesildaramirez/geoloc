'use strict';

angular.module('geolocApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('store-form', {
        url: '/store/form/:id',
        template: '<store-form></store-form>',
        authenticate: 'admin'
      });
  });
