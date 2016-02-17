/*
 * Firestatus Server base.
 */

var restify = require('restify');
var logger = require('./logger');

// Initialize Restify server
var server = restify.createServer({
  name: 'Firestatus'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.throttle({
  rate: 1,
  burst: 15,
  ip: true
}));
server.use(restify.CORS({
  // Defaults to ['*'].
  origins: ['*.portal.bazaarvoice.com'],
  // Defaults to false.
  credentials: true
}));

// log all incoming requests with response code
server.on('after', function(req, res, route, err) {
  if (err) {
    logger.info('REQ/RES: %s %s [%d]', req.method, req.url, err.status);
  }
  else {
    logger.info('REQ/RES: %s %s [%d]', req.method, req.url, res.statusCode);
  }
});

// Register all API modules
require('./apiBuilds')(server);

server.listen(8080, function() {
  logger.info('%s listening at %s', server.name, server.url);
});
