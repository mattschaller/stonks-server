// Initializes the `blobs` service on path `/blobs`
const { Blobs } = require('./blobs.class');
const hooks = require('./blobs.hooks');

const AWS = require('aws-sdk');
const Store = require('s3-blob-store');
const blobService = require('feathers-blob');
const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

AWS.config.update({ region: "us-east-1" });

const blobStore = Store({
        client: s3,
        bucket: 'feathers-blob-store'
    });

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/blobs', blobService({ Model: blobStore }));

  // Get our initialized service so that we can register hooks
  const service = app.service('blobs');

  service.hooks(hooks);
};