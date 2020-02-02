'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('posts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      dateLastEdited: {
        type: Sequelize.DATE,
        field: 'date_last_edited',
        allowNull: false
      }
    })
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('posts')
  }
}
