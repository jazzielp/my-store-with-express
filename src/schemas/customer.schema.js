const Joi = require('joi')

const id = Joi.number().integer().positive()
const firstName = Joi.string().max(100)
const lastName = Joi.string().max(100)
const address = Joi.string().max(100)
const phone = Joi.string().min(10).max(10)
const email = Joi.string().email()
const password = Joi.string().min(8).max(16)
const userName = Joi.string().max(100)
const userId = Joi.number().integer().positive()

const createCustomerSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  address: address.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
    userName: userName.required()

  })
})

const updateCustomerSchema = Joi.object({
  firstName,
  lastName,
  address,
  phone,
  userId
})

const getCustomerSchema = Joi.object({
  id: id.required()
})

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema
}
