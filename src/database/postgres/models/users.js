const { DataTypes } = require('sequelize')

const tableName = 'Users'

const attributes = {
  name: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
}

const options = {
  tableName,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
}

function define (database) {
  const model = database.define(
    tableName,
    attributes,
    options,
  )

  return model
}

module.exports = {
  define,
}
