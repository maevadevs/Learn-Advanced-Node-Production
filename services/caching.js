/**
 * @file
 * This file enable mongoose query server-level caching.
 * Caching is enabled on a per-mongoose query based.
 * Simply add .enableCache() on the mongoose query.
 * This file does not export anything other than clearCacheFor(key).
 * Simply import this file at the beginning of the application: index.js
 */

// DEPENDENCIES
// ************

const mongoose = require('mongoose')
const redis = require('redis')
const { promisify } = require('util') // Takes any function with callback and return a promise instead

// SETUP REDIS
// ***********

const { redisUrl } = require('@config/keys')
const redisClient = redis.createClient(redisUrl)
redisClient.hget = promisify(redisClient.hget) // Promisify this callback-based function

// SETUP MONGOOSE EXEC TO WORK WITH REDIS
// **************************************

// Custom mongoose.enableCache()
// -----------------------------
// Only cache mongoose queries on which the .cache() method is called

mongoose.Query.prototype.enableCache = function (options = {}) {
  this.useCache = true // this: the current query instance
  this.topLevelHashKey = JSON.stringify(options.rootkey || 'cache') // This will be the key of the root cache object
  return this // Allow chained function call
}

// Custom mongoose.exec()
// ----------------------

// Store reference to the original exec function
const originalExec = mongoose.Query.prototype.exec

// Overridding the mongoose.exec function
mongoose.Query.prototype.exec = async function () {

  // For Non-cached query: Just call the query with the original exec()
  if (!this.useCache) return originalExec.apply(this, arguments)

  // Else: CACHING SYSTEM
  // Create a unique key for each redis cache element
  // The query + The Collection Name
  const queryCacheKey = JSON.stringify({ ...this.getQuery(), collection: this.mongooseCollection.name })
  
  // Check redis if query has already been cached
  // Note: Redis always return JSON data
  const cachedValue = await redisClient.hget(this.topLevelHashKey, queryCacheKey)

  // If there is any cached value, return right away
  if (cachedValue) {
    // Note: Redis always return JSON data
    // Our application expect a Mongoose document from calling a query
    const pseudoDoc = JSON.parse(cachedValue)

    // pseudoDoc could be an array
    // Convert each element to a Mongoose Document
    if (Array.isArray(pseudoDoc)) return pseudoDoc.map(el => new this.model(el))

    // But if a single element
    // Just convert to a Mongoose model
    return new this.model(pseudoDoc)
  }

  // Else, call the original exec function to get Mongoose results
  // Note: Mongoose calls always return a Mongoose document
  const result = await originalExec.apply(this, arguments)

  // Save a cache of the result in redis
  // Automatically expire after 1 day
  redisClient.hset(this.topLevelHashKey, queryCacheKey, JSON.stringify(result), 'EX', 86400) // Expiration in seconds

  // Our application expect a Mongoose document from calling a query
  return result
}

// clearCacheFor(key)
// ------------------
// Public function to allow to clear a specific key in cache

const clearCacheFor = hashKey => redisClient.del(JSON.stringify(hashKey))

// EXPORT: PUBLIC API ONLY
// ******

module.exports = {
  clearCacheFor 
}
