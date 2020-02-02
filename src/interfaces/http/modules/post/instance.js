
const container = require('src/container') // we have to get the DI
const postService = require('src/app/post')

module.exports = () => {
  const { repository: {
    postRepository
  } } = container.cradle

  const postServiceInjection = postService({ postRepository })

  return {
    postServiceInjection
  }
}
