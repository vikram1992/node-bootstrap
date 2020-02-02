module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define('posts', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateLastEdited: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    hooks: {
    },
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate () {
        // associations can be defined here
      }
    }
  })

  return Post
}
