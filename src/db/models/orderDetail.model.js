const { Model, DataTypes, Sequelize } = require('sequelize')

const { PRODUCT_TABLE } = require('./product.model')
const { ORDER_TABLE } = require('./order.model')

const ORDER_DETAIL_TABLE = 'order_details'

const OrderDetailSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER
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

class OrderDetail extends Model {
  static associate (models) {
    this.belongsTo(models.Order, {
      as: 'order'
    })
    this.belongsTo(models.Product, {
      as: 'product'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: ORDER_DETAIL_TABLE,
      modelName: 'OrderDetail',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
}

module.exports = {
  OrderDetail,
  OrderDetailSchema,
  ORDER_DETAIL_TABLE
}
