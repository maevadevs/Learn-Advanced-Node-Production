// Dependencies
require('dotenv').config()
require('module-alias/register')
const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const { mongoURI, cookieKey } = require('@config/keys')
const path = require('path')

// DB and Passport
require('@models/User')
require('@models/Blog')
require('@services/passport')

// Server-Level Caching
require('@services/caching')

// Routes
const setupAuthRoutes = require('@routes/authRoutes')
const setupBlogRoutes = require('@routes/blogRoutes')

// Server and DB Settings
const PORT = process.env.SERVER_PORT
mongoose.Promise = global.Promise
mongoose.connect(mongoURI, { useNewUrlParser: true })
const app = express()

// Server middleware
app.use(bodyParser.json())
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())

// Server Routes
setupAuthRoutes(app)
setupBlogRoutes(app)

// Production-only settings
if (['production'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => res.sendFile(path.resolve('client', 'build', 'index.html')))
}

// Start Server
app.listen(PORT, () => console.log(`Listening on port`, PORT))
