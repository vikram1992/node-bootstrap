/**
 * We need to find a way to user the repositories for our test that it we will have minimum impact once we change our ORM or our DATABASE
 */
const { curry } = require('ramda')

// we will call each repo on thier test  cases  here we will just compose the items.

const sequelize = app.resolve('database').sequelize

const models = (name) => app.resolve('database')[name]

const repositories = (name) => app.resolve(name)

const domains = (name) => app.resolve(name)

const services = (name) => app.resolve(name)

const values = (name) => app.resolve(name)

const repository = curry((repo, model, domain) => {
  return repo({ model, domain })
})

module.exports = {
  models,
  repositories,
  repository,
  domains,
  sequelize,
  services,
  values
}
