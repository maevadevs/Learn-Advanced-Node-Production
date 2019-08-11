// DEPENDENCIES
// ************

const passport = require('passport')

// ROUTES
// ******

const setupAuthRoutes = app => {

  // Initiate Google Authentication
  // Handle through Passport

  app.get('/auth/google', 
    passport.authenticate('google', {scope: ['profile', 'email']})
  )

  // Handle Google Authentication callback
  // Handle through Passport
  // Redirect to '/blogs' after successful login

  app.get('/auth/google/callback', 
    passport.authenticate('google'), 
    (req, res) => res.redirect('/blogs')
  )

  // Handle logout
  // Redirect to '/' after successful logout

  app.get('/auth/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  // Used to check if a user is currently logged in
  // If exist, current_user is automatically added on req.user by Passport

  app.get('/api/current_user', (req, res) => res.send(req.user))
}

// EXPORT
// ******

module.exports = setupAuthRoutes
