const { models } = require('../lib/sequelize')
const boom = require('@hapi/boom')

class userService {
  async find () {
    const result = await models.User.findAll()
    return result
  }

  async findOne (id) {
    const result = await models.User.findByPk(id)
    if (!result) {
      throw boom.notFound('User not found')
    }
    return result
  }

  async create (data) {
    const result = await models.User.create(data)
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
