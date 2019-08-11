// DEPENDENCIES
// ************

const mongoose = require('mongoose')
const authenticate = require('@middleware/authenticate')
const clearCacheAfter = require('@middleware/clearCacheAfter')

// MONGOOSE MODELS
// ***************

const Blog = mongoose.model('Blog')

// ROUTES
// ******

const setupBlogRoutes = app => {

  // Find a blog by id and return to the user
  // Require the user to be authenticated
  // CAHCED ROUTE
  
  app.get('/api/blogs/:id', [authenticate, clearCacheAfter], async (req, res) => {
    // User is available on req.user thanks to Passport
    const userId = req.user.id
    const blogId = req.params.id
    const blog = await Blog.findOne({
      _user: userId,
      _id: blogId
    }).enableCache({ rootkey: userId })
    res.send(blog)
  })

  // Find a list of blogs and send back to the user
  // Require the user to be authenticated
  // CACHED ROUTE

  app.get('/api/blogs', authenticate, async (req, res) => {
    // User is available on req.user thanks to Passport
    const userId = req.user.id
    const blogs = await Blog.find({ _user: userId }).enableCache({ rootkey: userId })
    res.send(blogs)
  })

  // Create and save a new blog for the user
  // Require the user to be authenticated

  app.post('/api/blogs', authenticate, async (req, res) => {
    // Create a new blog post
    const { title, content } = req.body
    const blog = new Blog({
      title,
      content,
      _user: req.user.id
    })
    // Save blog post to DB
    try {
      await blog.save()
      res.send(blog)
    } catch (err) {
      res.send(400, err)
    }
  })
}

// EXPORT
// ******

module.exports = setupBlogRoutes
