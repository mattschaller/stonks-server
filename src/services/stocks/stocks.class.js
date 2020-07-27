const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "brvmn4frh5rckcaglq1g";
const finnhubClient = new finnhub.DefaultApi()

/* eslint-disable no-unused-vars */
exports.Stocks = class Stocks {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return [];
  }

  async get (id, params) {

    const description = await new Promise((res, rej) => {
      return finnhubClient.companyProfile2({'symbol': id }, (error, data, response) => {
        if(!data) return rej(error);
        return res(data);
      })
    });

    const quote = await new Promise((res, rej) => {
      return finnhubClient.quote(id, (error, data, response) => {
        if(!data) return rej(error);
        return res(data);
      });
    });

    const financials = await new Promise((res, rej) => {
      return finnhubClient.companyBasicFinancials(id, "margin", (error, data, response) => {
        if(!data) return rej(error);
        return res(data);
      });
    })

    return { description, quote, financials };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
};
