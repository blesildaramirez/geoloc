'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var storeCtrlStub = {
  index: 'storeCtrl.index',
  show: 'storeCtrl.show',
  create: 'storeCtrl.create',
  update: 'storeCtrl.update',
  destroy: 'storeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var storeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './store.controller': storeCtrlStub
});

describe('Store API Router:', function() {

  it('should return an express router instance', function() {
    expect(storeIndex).to.equal(routerStub);
  });

  describe('GET /api/stores', function() {

    it('should route to store.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'storeCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/stores/:id', function() {

    it('should route to store.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'storeCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/stores', function() {

    it('should route to store.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'storeCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/stores/:id', function() {

    it('should route to store.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'storeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/stores/:id', function() {

    it('should route to store.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'storeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/stores/:id', function() {

    it('should route to store.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'storeCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
