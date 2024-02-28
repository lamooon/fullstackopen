const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  return blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0)

}

const favoriteBlog = (blogs) => {

  return blogs.reduce((maxLike, currentBlog) => maxLike.likes > currentBlog.likes ? maxLike : currentBlog, 0)
}

const mostBlogs = (blogs) => {
  
}

const mostLikes = (blogs) => {
  const author = _.maxBy(blogs, (blog) => blog.author);

  blogs.groupBy(blogs, )
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}