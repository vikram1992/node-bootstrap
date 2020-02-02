const { Post } = require('src/domain/post')
const { Sequelize } = require('sequelize')

module.exports = ({ postRepository }) => {
  // code for getting all the items
  const getPosts = async ({ search, sort, page, pageLength }) => {
    let dynamicWhereClause = _search(search)
    const { offset, limit } = _generateOffsetLimit(page, pageLength)
    dynamicWhereClause.order = _sort(sort)
    dynamicWhereClause.offset = offset
    dynamicWhereClause.limit = limit
    const posts = await postRepository.findAll(dynamicWhereClause)
    const postCount = await postRepository.count(dynamicWhereClause)
    return { posts, count: postCount }
  }

  const _search = (search) => {
    let dynamicWhereClause = ''
    if (search) {
      if (search.startsWith('"') && search.endsWith('"')) {
        search = decodeURI(search).replace(' ', '%')
        search = search.replace(/\"/g, '')
        dynamicWhereClause = { where: { [Sequelize.Op.or]: [{ name: { [Sequelize.Op.like]: `%${search}%` } }, { description: { [Sequelize.Op.like]: `%${search}%` } }] } }
      } else {
        dynamicWhereClause = { where: { [Sequelize.Op.or]: [{ name: { [Sequelize.Op.like]: `%${search}%` } }, { description: { [Sequelize.Op.like]: `%${search}%` } }] } }
      }
    }
    return dynamicWhereClause
  }

  const _generateOffsetLimit = (page, pageLength) => {
    let offset = 0
    let limit = 10
    if (page && pageLength) {
      offset = page - 1
      limit = pageLength * offset
    }
    return { offset, limit }
  }

  const _sort = (sort) => {
    let orderByClause = [
      ['name', 'ASC'],
      ['date_last_edited', 'DESC']
    ]
    if (sort) {
      const sortSplit = sort.split('|')
      orderByClause = sortSplit.map(element => {
        const elementSplit = element.split('@')
        return [elementSplit[0], elementSplit[1]]
      })
    }
    return orderByClause
  }

  return {
    getPosts
  }
}
