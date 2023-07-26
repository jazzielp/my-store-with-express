const boom = require('@hapi/boom')

const { models } = require('../lib/sequelize')

class OrderService {
  async find () {
    const result = await models.Order.findAll({
      include: [{
        model: models.Customer,
        as: 'customer',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'address', 'phone', 'userId']
        }
      }],
      attributes: ['id', 'date', 'createdAt', 'updatedAt']
    })
    return result
  }

  async findOne (id) {
    const result = await models.Order.findByPk(id, {
      include: ['customer'],
      attributes: ['id', 'date', 'createdAt', 'updatedAt']
    })
    if (!result) {
      throw boom.notFound('Record not found')
    }
    return result
  }

  async create (data) {
    const result = await models.Order.create(data)
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

module.exports = OrderService
