const users = require('./users/users.service.js');
const portfolios = require('./portfolios/portfolios.service.js');
const positions = require('./positions/positions.service.js');
const stocks = require('./stocks/stocks.service.js');
const messages = require('./messages/messages.service.js');
const rooms = require('./rooms/rooms.service.js');
const blobs = require('./blobs/blobs.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(portfolios);
  app.configure(positions);
  app.configure(stocks);
  app.configure(messages);
  app.configure(rooms);
  app.configure(blobs);
};
