const boom = require('@hapi/boom')

const { models } = require('../lib/sequelize')

class OrderDetailService {
  async find () {
    const result = await models.OrderDetail.findAll({
      include: [{
        model: models.Product,
        as: 'product',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'categoryId', 'description', 'image']
        },
        include: [{
          model: models.Category,
          as: 'category',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }]
      }],
      attributes: ['id', 'orderId', 'quantity', 'createdAt', 'updatedAt']
    })
    return result
  }

  async findOne (id) {
    const result = await models.OrderDetail.findByPk(id, {
      include: [{
        model: models.Product,
        as: 'product',
        include: [{
          model: models.Category,
          as: 'category',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }]
      },
      {
        model: models.Order,
        as: 'order',
        include: ['customer']
      }]
    })
    if (!result) {
      throw boom.notFound('Record not found')
    }
    return result
  }

  async create (data) {
    const result = await models.OrderDetail.create(data)
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

module.exports = OrderDetailService
