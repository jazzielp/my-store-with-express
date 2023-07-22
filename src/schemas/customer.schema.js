const Joi = require('joi')

const id = Joi.number().integer().positive()
const firstName = Joi.string().max(100)
const lastName = Joi.string().max(100)
const email = Joi.string().email()
const password = Joi.string().min(6).max(200)
const phone = Joi.string().min(10).max(10)

const createCustomerSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
  phone: phone.required()
})

const updateCustomerSchema = Joi.object({
  firstName,
  lastName,
  email,
  password,
  phone
})

const getCustomerSchema = Joi.object({
  id: id.required()
})

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema
}
