const tableName = 'Users'

module.exports = {
  up (queryInterface, DataTypes) {
    return queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(256),
      },
      email: {
        type: DataTypes.STRING(256),
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    })
  },

  down (queryInterface) {
    return queryInterface.dropTable(tableName)
  },
}
