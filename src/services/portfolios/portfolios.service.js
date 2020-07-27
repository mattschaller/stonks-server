// Initializes the `portfolios` service on path `/portfolios`
const { Portfolios } = require('./portfolios.class');
const createModel = require('../../models/portfolios.model');
const hooks = require('./portfolios.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/portfolios', new Portfolios(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('portfolios');

  service.hooks(hooks);
};
