/**
 * POST /
 *
 * Description:
 *   Echo's back the payload passed in
 *
 * Request Payload:
 *   {
 *     ...
 *   }
 *
 * Response Payload:
 *   {
 *     ...
 *   }
 *
 * Return codes:
 *   200 Success
 *   429 Too many requests
 *   500 Internal server error
 */
var post = function (req, res, next) {
  var responsePayload = req.params;
  res.json(200, responsePayload);
  next();
};

/**
 * GET /
 *
 * Description:
 *   Returns server info
 *
 * Query Parameters:
 *   example: shows how query parameters work
 *
 * Request Payload:
 *   None
 *
 * Response Payload:
 *   {
 *     example: <whatever was passed in>,
 *   }
 *
 * Return codes:
 *   200 Success
 *   429 Too many requests
 *   500 Internal server error
 */
var get = function (req, res, next) {
  var exampleQueryParam = req.params.example || 'nothing passed in';

  var responsePayload = {
    example: exampleQueryParam
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
  server.post('/', post);
  server.get('/', get);
};
