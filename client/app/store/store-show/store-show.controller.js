'use strict';

(function(){

class StoreShowComponent {
  constructor($http, $stateParams, $scope, Auth) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.$scope = $scope;
    this.isAdmin = Auth.isAdmin;
    this.api = '/api/stores';
    this.store = {};
    this.fetching = {};
    this.path = [];
    this.selectedLoc = {};

    this.$scope.$on('g-places-autocomplete:select',(event) => {
      this.selectedLoc.lat = event.targetScope.model.geometry.location.lat();
      this.selectedLoc.lng = event.targetScope.model.geometry.location.lng();
    });
  }

  $onInit() {
    this.fetching.store =  true;
    this.$http.get(`${this.api}/${this.$stateParams.id}`)
      .then(res => {
        this.store = res.data;
        this.center = {
          lat: this.store.geoLocation.coordinates[1],
          lng: this.store.geoLocation.coordinates[0],
          zoom: 15
        };
        this.markers = [{
          lat: this.store.geoLocation.coordinates[1],
          lng: this.store.geoLocation.coordinates[0],
          draggable: false,
          focus: true,
          message: this.store.name
        }];
      })
      .finally(() => this.fetching.store = false);
  }

  showInputDirection() {
    this.selectedParams = {
      origin: new google.maps.LatLng(this.selectedLoc.lat, this.selectedLoc.lng),
      destination: new google.maps.LatLng(this.center.lat, this.center.lng),
      travelMode: 'DRIVING'
    };
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(this.selectedParams, (response, status) => {
      if (status === 'OK') {
        angular.forEach(response.routes, (r, i) => {
          this.path.push({
            color: '#008000',
            weight: 5,
            latlngs: []
          });
          angular.forEach(r.overview_path, (op) => {
            this.path[this.path.length - 1].latlngs.push({ lat: op.lat(), lng: op.lng() });
          });
        });
      }
    });
  }

  showDirection() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => {
        this.pathParams = {
          origin: new google.maps.LatLng(p.coords.latitude, p.coords.longitude),
          destination: new google.maps.LatLng(this.center.lat, this.center.lng),
          travelMode: 'DRIVING'
        };
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(this.pathParams, (response, status) => {
          if (status === 'OK') {
            angular.forEach(response.routes, (r, i) => {
              this.path.push({
                weight: 5,
                latlngs: []
              });
              angular.forEach(r.overview_path, (op) => {
                this.path[this.path.length - 1].latlngs.push({ lat: op.lat(), lng: op.lng() });
              });
            });
          }
        });
      });
    }
  }
}

angular.module('geolocApp')
  .component('storeShow', {
    templateUrl: 'app/store/store-show/store-show.html',
    controller: StoreShowComponent
  });

})();
