const Joi = require('joi')

const id = Joi.number().integer()
const orderId = Joi.number().integer().positive()
const productId = Joi.number().integer().positive()
const quantity = Joi.number().integer().positive()

const createOrderDetailSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  quantity: quantity.required()
})

const updateOrderDetailSchema = Joi.object({
  orderId,
  productId,
  quantity
})

const getOrderDetailSchema = Joi.object({
  id: id.required()
})

module.exports = {
  createOrderDetailSchema,
  updateOrderDetailSchema,
  getOrderDetailSchema
}
