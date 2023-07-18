const { models } = require('../lib/sequelize')

class userService {
  async find () {
    const result = await models.User.findAll()
    return result
  }

  async findOne (id) {

  }

  async create (data) {
    return {
      message: 'Create users',
      data,
      code: 200
    }
  }

  async update (id, data) {
    return {
      message: 'update user by id: ' + id,
      data,
      code: 200
    }
  }

  async delete (id) {
    return {
      message: 'Delete users by id: ' + id,
      code: 200
    }
  }
}

module.exports = userService
