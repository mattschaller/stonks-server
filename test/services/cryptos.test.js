const assert = require('assert');
const app = require('../../src/app');

describe('\'cryptos\' service', () => {
  it('registered the service', () => {
    const service = app.service('cryptos');

    assert.ok(service, 'Registered the service');
  });
});
