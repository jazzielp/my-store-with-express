const { DataTypes, Model, Sequelize } = require('sequelize')

const CATEGORY_TABLE = 'categories'

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
  }

}

class Category extends Model {
  static associate (models) {
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
}

module.exports = { Category, CategorySchema, CATEGORY_TABLE }
