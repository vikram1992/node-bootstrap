'use strict'
const fs = require('fs')
const { uuid } = require('uuidv4')
const path = require('path')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const contents = JSON.parse(fs.readFileSync(path.join(__dirname, '/mock_data.json'), 'utf-8'))
    const postsWithUUID = contents.map(post => ({ ...post, id: uuid() }))
    const posts = postsWithUUID.map(post => {
      const date = new Date(post.dateLastEdited)
      delete post.dateLastEdited
      post.date_last_edited = date
      return post
    })
    posts.push({
      id : uuid(),
      name: 'Senior Security Test Agent',
      image: 'http://lorempixel.com/640/480',
      description: 'lorem ipsum',
      date_last_edited: new Date()
    })
    return queryInterface.bulkInsert('posts', posts, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('posts', null, {})
  }
}
