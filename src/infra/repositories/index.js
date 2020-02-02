const Post = require('./post')

module.exports = ({ database }) => {
  const postModel = database.models.posts

  return {
    postRepository: Post({ model: postModel })
  }
}
