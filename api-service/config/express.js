/**
 * Module dependencies.
 */

const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// const csrf = require('csurf');
const helmet = require('helmet');

const config = require('./');

const env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */

module.exports = function (app) {
  
  app.use(helmet());

  // Compression middleware (should be placed before express.static)
  app.use(
    compression({
      threshold: 512
    })
  );

  // Static files middleware
  app.use(express.static(config.root + '/public'));

  // Don't log during tests
  // Logging middleware
  app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

  // bodyParser should be above methodOverride
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());

  app.use(
    methodOverride(function (req) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  );

  // adds CSRF support
  // if (process.env.NODE_ENV !== 'test') {
  //   app.use(csrf());

  //   // This could be moved to view-helpers :-)
  //   app.use(function (req, res, next) {
  //     res.locals.csrf_token = req.csrfToken();
  //     next();
  //   });
  // }
};