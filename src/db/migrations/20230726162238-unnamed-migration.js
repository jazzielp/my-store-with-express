'use strict'
const { ORDER_TABLE, OrderSchema } = require('../models/order.model')
const { ORDER_DETAIL_TABLE, OrderDetailSchema } = require('../models/orderDetail.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ORDER_TABLE, OrderSchema)
    await queryInterface.createTable(ORDER_DETAIL_TABLE, OrderDetailSchema)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_DETAIL_TABLE)
    await queryInterface.dropTable(ORDER_TABLE)
  }
}
