const assert = require('assert');
const app = require('../../src/app');

describe('\'portfolio\' service', () => {
  it('registered the service', () => {
    const service = app.service('portfolio');

    assert.ok(service, 'Registered the service');
  });
});
