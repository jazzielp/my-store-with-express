const Joi = require('joi')

const id = Joi.number().integer().positive()
const name = Joi.string().max(50)
const description = Joi.string().max(255)
const price = Joi.number()
const image = Joi.string().max(255)
const categoryId = Joi.number().integer().positive()

const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  categoryId: categoryId.required(),
  image
})

const updateProductSchema = Joi.object({
  name,
  description,
  price,
  categoryId,
  image
})

const getProductSchema = Joi.object({
  id: id.required()
})

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema
}
