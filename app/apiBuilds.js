var restify = require('restify');

/**
 * GET /builds/
 *
 * Description:
 *   Returns the client's status data.
 *
 * Query Parameters
 *   client: the client's name. MANDATORY
 *   env: the environment (prod/stg)
 *   dz: the build's deployment zone
 *   locale: the build's locale
 *
 * Return codes:
 *   200 Success
 *   429 Too many requests
 *   500 Internal server error
 */
var get = function (req, res, next) {
  var baseData = {
    stg: {
      'Main Site': {
        en_US: 'started',
        de_DE: 'done',
        ja_JP: 'failed'
      }
    },
    prod: {
      'Main Site': {
        en_US: 'started',
        de_DE: 'done',
        ja_JP: 'done'
      }
    }
  };
  var responsePayload;

  if (!req.query.client) {
    return next(new restify.BadRequestError('Must provide client name.'));
  }
  else if (!req.query.env) {
    responsePayload = baseData;
  }
  else if (!req.query.dz) {
    responsePayload = baseData[req.query.env];
    if (!responsePayload) {
      return next(new restify.BadRequestError('Bad environment param.'));
    }
  }
  else if (!req.query.locale) {
    responsePayload = baseData[req.query.env][req.query.dz];
    if (!responsePayload) {
      return next(new restify.BadRequestError('Bad dz param.'));
    }
  }
  else {
    responsePayload = baseData[req.query.env][req.query.dz][req.query.locale];
    if (!responsePayload) {
      return next(new restify.BadRequestError('Bad locale param.'));
    }
  }

  res.json(200, responsePayload);
  next();
};

/*
 * We export an anonymous function which takes the Restify server as the only
 * parameter.  The function will register the private functions declared within
 * this module to the appropriate server paths and HTML commands.
 *
 * To use, the including file can run:
 *
 *   require('./apiRoot')(server);
 *
 * to register the API functions
 */
module.exports = function (server) {
  server.get('/builds/', get);
};
