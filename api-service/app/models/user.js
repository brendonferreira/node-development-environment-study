/*!
 * Module dependencies
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User schema
 */
const schema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' }
});

/**
 * Methods
 */
schema.method({});

/**
 * Statics
 */
schema.static({});

module.exports = { schema }