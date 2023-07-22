const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const { models } = require('../lib/sequelize')

class customerService {
  async find () {
    const result = await models.Customer.findAll()
    return result
  }

  async findOne (id) {
    const result = await models.Customer.findByPk(id)
    if (!result) {
      throw boom.notFound('Record not found')
    }
    return result
  }

  async create (data) {
    const hashPassword = await bcrypt.hash(data.password, 10)
    const result = await models.Customer.create({ ...data, password: hashPassword })
    delete result.dataValues.password
    return result
  }

  async update (id, data) {
    const record = await this.findOne(id)
    const result = await record.update(data)
    return result
  }

  async delete (id) {
    const record = await this.findOne(id)
    await record.destroy()
    return { message: 'Record deleted by id ' + id }
  }
}

module.exports = customerService
