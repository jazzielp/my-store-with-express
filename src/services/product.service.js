const boom = require('@hapi/boom')

const { models } = require('../lib/sequelize')

class productService {
  async find () {
    const result = await models.Product.findAll({
      include: ['category']
    })
    return result
  }

  async findOne (id) {
    const result = await models.Product.findByPk(id, {
      include: ['category']
    })
    if (!result) {
      throw boom.notFound('Record not found')
    }
    return result
  }

  async create (data) {
    const result = await models.Product.create(data)
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

module.exports = productService
