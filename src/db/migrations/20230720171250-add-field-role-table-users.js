'use strict'
const { UserSchema, USER_TABLE } = require('../models/user.model')
const { role } = UserSchema

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'role', role)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'role')
  }
}
