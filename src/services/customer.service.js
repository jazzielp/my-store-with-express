const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const { models } = require('../lib/sequelize')

class customerService {
  async find () {
    const result = await models.Customer.findAll({
      include: ['user']
    })
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
    const user = data.user
    const passwordHash = await bcrypt.hash(user.password, 10)
    const newUser = await models.User.create({ ...data.user, password: passwordHash, ...data })
    const result = await models.Customer.create({ ...data, userId: newUser.id })
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
