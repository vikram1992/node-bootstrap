const { toEntity } = require('./transform')

module.exports = ({ model }) => {
  const findAll = async (dynamicWhereClause) => {
    let result = await model.findAll(dynamicWhereClause).then((entity) =>
      entity.map((data) => {
        const { dataValues } = data
        return toEntity(dataValues)
      })
    )
    return result
  }

  const count = async (dynamicWhereClause) => {
    let result = await model.count(dynamicWhereClause)
    return result
  }

  const create = (...args) =>
    model.create(...args).then(({ dataValues }) => toEntity(dataValues))

  const update = (...args) =>
    model.update(...args)
      .catch((error) => { throw new Error(error) })

  const findById = (...args) =>
    model.findByPk(...args)
      .then(({ dataValues }) => toEntity(dataValues))
      .catch((error) => { throw new Error(error) })

  const findOne = (...args) =>
    model.findOne(...args)
      .then(({ dataValues }) => toEntity(dataValues))
      .catch((error) => { throw new Error(error) })

  const destroy = (...args) =>
    model.destroy(...args)

  return {
    findAll,
    create,
    update,
    findById,
    findOne,
    destroy,
    count
  }
}
