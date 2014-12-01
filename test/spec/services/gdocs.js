'use strict';

describe('Service: GDocs', function () {

  // load the service's module
  beforeEach(module('interviewsExplorationApp'));

  // instantiate service
  var GDocs;
  beforeEach(inject(function (_GDocs_) {
    GDocs = _GDocs_;
  }));

  it('should do something', function () {
    expect(!!GDocs).toBe(true);
  });

});
