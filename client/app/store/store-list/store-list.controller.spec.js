'use strict';

describe('Component: StoreListComponent', function () {

  // load the controller's module
  beforeEach(module('geolocApp'));

  var StoreListComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    StoreListComponent = $componentController('store-list', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
