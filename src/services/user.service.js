const sequelize = require('../lib/sequelize')

class userService {
  async find () {
    const [data] = await sequelize.query('SELECT * FROM product')
    return {
      message: 'Find users',
      data,
      code: 200
    }
  }

  async findOne (id) {
    return {
      message: 'Find user by id: ' + id,
      code: 200
    }
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
