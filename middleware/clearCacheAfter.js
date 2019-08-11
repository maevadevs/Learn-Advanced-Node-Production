/**
 * @file
 * This file contains a middleware that allows to clear cache after a route has been viewed.
 * The clearing of the cache runs after the req handler has already run 
 */

// DEPENDENCIES
// ************

const { clearCacheFor } = require('@services/caching')

const clearCacheAfter = async (req, res, next) => {
  // This middleware should run AFTER the req handler has already run using this trick
  await next() // Call the route handler first and await
  // Clear cache for this user
  clearCacheFor(req.user.id)
}

module.exports = clearCacheAfter
