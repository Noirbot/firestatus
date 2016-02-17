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
  var responsePayload = {
    client: 'walmart-ca',
    builds: {
      stg: {
        'Main Site': {
          12: {
            en_US: 'started',
            de_DE: 'done',
            ja_JP: 'failed'
          }
        }
      },
      prod: {
        'Main Site': {
          12: {
            en_US: 'started',
            de_DE: 'done',
            ja_JP: 'done'
          }
        }
      }
    }
  };
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
