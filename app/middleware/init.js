const errorHandlerMiddleware = require('./error-handler-middleware');

function init (app) {
  app.use(errorHandlerMiddleware);
};

module.exports = init;
