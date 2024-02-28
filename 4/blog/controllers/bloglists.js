const blogListsRouter = require('express').Router()
const Blog = require('../models/bloglist')

blogListsRouter.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs);
  })
})

blogListsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogListsRouter