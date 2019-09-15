const fs = require('fs').promises
const path = require('path')

async function* getFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

/**
 * Module dependencies.
 */

// const home = require('../app/controllers/home');

/**
 * Expose
 */

module.exports = async function(app) {

  for await (const filePath of getFiles( path.join( __dirname, '..', 'app', 'routes' )) ){
    const _module = require(filePath)
    const _modulePath = filePath.split('/routes')[1].split('.js')[0]

    const requestPath = _modulePath.replace('/index', '/').replace('index', '/')
    
    if( typeof _module.default === 'function' ) {
      app.get(requestPath, _module.default)
      continue;
    }

    for( const method in _module.default ) {
      app[method]( requestPath, _module.default[method] )
    }
  }

  // app.get('/', home.index);

  /**
   * Error handling
   */

  // app.use(function(err, req, res, next) {
  //   // treat as 404
  //   if (
  //     err.message &&
  //     (~err.message.indexOf('not found') ||
  //       ~err.message.indexOf('Cast to ObjectId failed'))
  //   ) {
  //     return next();
  //   }
  //   console.error(err.stack);
  //   // error page
  //   res.status(500).render('500', { error: err.stack });
  // });

  // assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404).json({
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};