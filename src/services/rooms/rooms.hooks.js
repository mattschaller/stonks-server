const { authenticate } = require('@feathersjs/authentication').hooks;

const linkUsers = require('../../hooks/link-users');
const populateUser = require('../../hooks/populate-user');


module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [populateUser()],
    get: [populateUser()],
    create: [linkUsers(), populateUser(),], 
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
