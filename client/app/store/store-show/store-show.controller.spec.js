'use strict';

describe('Component: StoreShowComponent', function () {

  // load the controller's module
  beforeEach(module('geolocApp'));

  var StoreShowComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    StoreShowComponent = $componentController('store-show', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
