'use strict';

describe('Component: StoreFormComponent', function () {

  // load the controller's module
  beforeEach(module('geolocApp'));

  var StoreFormComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    StoreFormComponent = $componentController('store-form', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
