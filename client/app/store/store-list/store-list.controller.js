'use strict';

(function(){

class StoreListComponent {
  constructor($http, $uibModal, Modal, Auth) {
    this.$http = $http;
    this.$uibModal = $uibModal;
    this.Modal = Modal;
    this.isAdmin = Auth.isAdmin;
    this.stores = [];
    this.fetching = { stores: true };
    this.api = '/api/stores';
    this.pagination = { page: 1, total: 0 };
    this.params = {
      start: 0,
      max: 10
    };
  }

  $onInit() {
    this.getList();
  }

  getList() {
    this.fetching.stores = true;
    this.params.start = (this.pagination.page - 1) * this.params.max;

    this.$http.get(this.api, { params: this.params })
      .then(response => {
        this.stores = response.data.data;
        this.pagination.total = response.data.count;
      })
      .finally(() => this.fetching.stores = false);
  }

  delete(store) {
    this.Modal.confirm.delete(() => {
      this.$http.delete(`${this.api}/${store._id}`)
        .then(() => this.getList());
    })(store.name);
  }

  getNearby() {
    this.$uibModal.open({
      templateUrl: 'app/store/store-list/nearby-stores.html',
      controller: 'NearbyModalCtrl',
      controllerAs: '$ctrl'
    });
  }
}

angular.module('geolocApp')
  .component('storeList', {
    templateUrl: 'app/store/store-list/store-list.html',
    controller: StoreListComponent
  }).controller('NearbyModalCtrl',
    function($uibModalInstance, $http, $scope, $timeout) {
      this.fetching = { location: true, stores: true };
      this.stores = [];
      this.total = 0;
      this.markers = [];

      $timeout(() => this.fetching.location = false, 2000);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((p) => {
          this.center = {
            lat: p.coords.latitude,
            lng: p.coords.longitude,
            zoom: 12
          };

          this.params = {
            lat: this.center.lat,
            lng: this.center.lng
          };

          $http.get('/api/stores/nearby', { params: this.params })
            .then(response => {
              this.stores = response.data.data;
              angular.forEach(this.stores, (store) => {
                this.markers.push({
                  lat: store.geoLocation.coordinates[1],
                  lng: store.geoLocation.coordinates[0],
                  draggable: false,
                  message: store.name
                });
              });
              this.total = response.data.count;
            })
            .finally(() => this.fetching.stores = false);

          $scope.$apply();

        });
      }

      this.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };

  });

})();
