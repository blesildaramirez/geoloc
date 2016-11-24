'use strict';

(function(){

class StoreFormComponent {
  constructor($http, $state, $scope, $stateParams) {
    this.$http = $http;
    this.$state = $state;
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.store = {};
    this.geo = '';
    this.fetching = {};
    this.errors = {};
    this.markers = {};
    this.center = null;
    this.api = '/api/stores';
    this.autocompleteOptions = {
      componentRestrictions: { country: 'ph' }
    };

    this.$scope.$on('g-places-autocomplete:select',(event) => {
      this.center.lat = event.targetScope.model.geometry.location.lat();
      this.center.lng = event.targetScope.model.geometry.location.lng();
      this.store.address = event.targetScope.model.formatted_address;
      this.markers = [{
        lat: this.center.lat,
        lng: this.center.lng,
        draggable: false
      }];
    });
  }

  $onInit() {
    if (this.$stateParams.id) {
      this.fetching.store =  true;
      this.$http.get(`${this.api}/${this.$stateParams.id}`)
        .then(res => {
          this.store = res.data;
          this.geo = this.store.address;
          this.center = {
            lat: this.store.geoLocation.coordinates[1],
            lng: this.store.geoLocation.coordinates[0],
            zoom: 12
          };
        })
        .finally(() => this.fetching.store = false);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((p) => {
          this.center = {
            lat: p.coords.latitude,
            lng: p.coords.longitude,
            zoom: 12
          };
          this.$scope.$apply();
        });
      }
    }
  }

  save(form) {
    this.submitted = true;

    if (form.$valid && !this.errors.geoLocation) {
      var data = {
        name: this.store.name,
        address: this.store.address,
        geoLocation: {
          coordinates: [this.center.lng, this.center.lat]
        }
      };
      if (this.store._id) {
        this.$http.put(`${this.api}/${this.$stateParams.id}`, data).then(() => {
          this.$state.go('store-list');
        }).catch(err => {
          this.setErrors(err, form);
        });
      } else {
        this.$http.post(this.api, data).then(() => {
          this.$state.go('store-list');
        }).catch(err => {
          this.setErrors(err, form);
        });
      }
    }
  }

  setErrors(err, form) {
    err = err.data;
    this.errors = {};

    // Update validity of form fields that match the mongoose errors
    angular.forEach(err.errors, (error, field) => {
      form[field].$setValidity('mongoose', false);
      this.errors[field] = error.message;
    });
  }

  invalidateAddress() {
    this.errors.geoLocation = (typeof this.geo === 'string');
  }
}

angular.module('geolocApp')
  .component('storeForm', {
    templateUrl: 'app/store/store-form/store-form.html',
    controller: StoreFormComponent
  });

})();
