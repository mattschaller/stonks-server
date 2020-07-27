// Initializes the `stocks` service on path `/stocks`
const { Stocks } = require('./stocks.class');
const hooks = require('./stocks.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/stocks', new Stocks(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('stocks');

  service.hooks(hooks);
};
