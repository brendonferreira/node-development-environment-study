/**
 * Module dependencies
 */
const express = require('express')
const mongoose = require('mongoose')

// const config = require('../config')
const registerMiddlewheres = require('../config/express')
const registerRoutes = require('../config/routes')

const port = process.env.PORT || 3000;

const app = express()

registerMiddlewheres(app);
registerRoutes(app);

const boot = async () => { 

  await mongoose.connect( (process.env.MONGO_URL || 'mongodb://localhost:27017/admin'), { 
    keepAlive: 1, 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  });

  app.listen(port, () => {
    console.log('Express app started on port ' + port);
  });
}

boot()