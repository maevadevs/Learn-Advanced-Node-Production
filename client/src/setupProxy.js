/**
 * @file
 * This file is required for setting advanced proxy settings with Create-React-App
 * This file must be named setupProxy.js and must be in client/src
 * Required to install http-proxy-middleware module in client
 * Note: This file only supports Node's JavaScript syntax
 * Note: You do not need to import this file anywhere. It is automatically registered when you start the development server
 */

const proxy = require('http-proxy-middleware')
    
module.exports = craServer => {
  // We can have as many app.use() in here
  craServer.use('/auth', proxy({ 'target': 'http://localhost:5000' }))
  craServer.use('/api', proxy({ 'target': 'http://localhost:5000' }))
}
