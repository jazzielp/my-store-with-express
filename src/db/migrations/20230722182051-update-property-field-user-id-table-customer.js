'use strict'
const { DataTypes } = require('sequelize')
const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customer.model')
const { userId } = CustomerSchema

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'userId', {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'user_id',
      unique: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'userId', userId)
  }
}
