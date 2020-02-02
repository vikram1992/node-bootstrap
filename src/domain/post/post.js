const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData } = require('../helper')

const Post = t.struct({
  id: t.maybe(t.String),
  name: t.String,
  image: t.String,
  description: t.String,
  dateLastEdited: t.Date
})

module.exports = compose(
  cleanData,
  Post
)
