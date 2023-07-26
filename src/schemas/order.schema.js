const Joi = require('joi')

const id = Joi.number().integer().positive()
const date = Joi.date()
const customerId = Joi.number().integer().positive()

const createOrderSchema = Joi.object({
  date: date.required(),
  customerId: customerId.required()
})

const updateOrderSchema = Joi.object({
  date,
  customerId
})

const getOrderSchema = Joi.object({
  id: id.required()
})

module.exports = {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema
}
