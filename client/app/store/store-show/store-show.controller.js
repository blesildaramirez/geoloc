'use strict';

(function(){

class StoreShowComponent {
  constructor($http, $stateParams) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.api = '/api/stores';
    this.store = {};
    this.fetching = {};
  }

  $onInit() {
    this.fetching.store =  true;
    this.$http.get(`${this.api}/${this.$stateParams.id}`)
      .then(res => {
        this.store = res.data;
        this.geo = this.store.address;
        this.center = {
          lat: this.store.geoLocation.coordinates[0],
          lng: this.store.geoLocation.coordinates[1],
          zoom: 12
        };
      })
      .finally(() => this.fetching.store = false);
  }
}

angular.module('geolocApp')
  .component('storeShow', {
    templateUrl: 'app/store/store-show/store-show.html',
    controller: StoreShowComponent
  });

})();
