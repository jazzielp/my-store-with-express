const Joi = require('joi')

const id = Joi.number().integer().positive()
const userName = Joi.string().max(100)
const firstName = Joi.string().max(100)
const lastName = Joi.string().max(100)
const email = Joi.string().email()
const password = Joi.string().min(6).max(200)

const createUserSchema = Joi.object({
  userName: userName.required(),
  firstName: firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required()
})

const updateUserSchema = Joi.object({
  userName,
  firstName,
  lastName,
  email,
  password
})

const getUserSchema = Joi.object({
  id: id.required()
})

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema
}
