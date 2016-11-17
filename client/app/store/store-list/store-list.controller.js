'use strict';

(function(){

class StoreListComponent {
  constructor($http, Modal, Auth) {
    this.$http = $http;
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
}

angular.module('geolocApp')
  .component('storeList', {
    templateUrl: 'app/store/store-list/store-list.html',
    controller: StoreListComponent
  });

})();
