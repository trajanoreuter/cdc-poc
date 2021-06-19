const { DataTypes } = require('sequelize')

const tableName = 'Todos'

const attributes = {
  todo: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
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
