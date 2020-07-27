// Application hooks that run for every service
const search = require('feathers-nedb-fuzzy-search')
module.exports = {
  before: {
    all: [],
    find: [search({ fields: ['email', 'name'] })],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
