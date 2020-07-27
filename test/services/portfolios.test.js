const assert = require('assert');
const app = require('../../src/app');

describe('\'portfolios\' service', () => {
  it('registered the service', () => {
    const service = app.service('portfolios');

    assert.ok(service, 'Registered the service');
  });
});
