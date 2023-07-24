const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const { models } = require('../lib/sequelize')

class userService {
  async find () {
    const result = await models.User.findAll({ include: ['customer'] })
    return result
  }

  async findOne (id) {
    const result = await models.User.findByPk(id)
    if (!result) {
      throw boom.notFound('User not found')
    }
    return result
  }

  async findByEmail (email) {
    const result = await models.User.findOne({ where: { email } })
    return result
  }

  async create (data) {
    const hashPassword = await bcrypt.hash(data.password, 10)
    const result = await models.User.create({ ...data, password: hashPassword })
    delete result.dataValues.password
    return result
  }

  async update (id, data) {
    const user = await this.findOne(id)
    const result = await user.update(data)
    return result
  }

  async delete (id) {
    const user = await this.findOne(id)
    await user.destroy()
    return { message: 'User deleted by id ' + id }
  }
}

module.exports = userService
