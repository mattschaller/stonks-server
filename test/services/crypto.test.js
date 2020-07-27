const assert = require('assert');
const app = require('../../src/app');

describe('\'crypto\' service', () => {
  it('registered the service', () => {
    const service = app.service('crypto');

    assert.ok(service, 'Registered the service');
  });
});
