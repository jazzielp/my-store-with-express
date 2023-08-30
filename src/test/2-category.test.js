const request = require('supertest')

const { app, server } = require('../index')
const sequelize = require('../lib/sequelize')

const { Category } = require('../db/models/category.model')
let token = null

beforeAll(async () => {
  await sequelize.sync({ force: true })
  await Category.bulkCreate([
    {
      name: 'Category 1'
    },
    {
      name: 'Category 2'
    }
  ])

  const response = await request(app)
    .post('/api/auth/login')
    .send({
      username: 'castor@gmail.com',
      password: '123456'
    })

  token = response.body.token
})

afterAll(async () => {
  await sequelize.close()
})

describe('TEST FOR CATEGORY ENDPOINTS', () => {
  describe('GET /categories', () => {
    test('should return a 200 code, an array and two objects', async () => {
      const response = await (await request(app)
        .get('/api/categories'))
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body).toHaveLength(2)
    })
  })

  describe('GET /categories/:id', () => {
    test('should return a 200 code and an object', async () => {
      const response = await request(app).get('/api/categories/1')
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Object)
    })
  })

  describe('POST /categories', () => {
    test('should return a 201 code and an object', async () => {
      const response = await request(app)
        .post('/api/categories')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Category 3'
        })
      expect(response.text).toBe(token)
      expect(response.status).toBe(201)
      expect(response.body).toBeInstanceOf(Object)
    })
  })

  describe('PUT /categories/:id', () => {
    test('should return a 200 code and an object', async () => {
      const response = await request(app)
        .put('/api/categories/1')
        .send({
          name: 'Category 1 Updated'
        })
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Object)
    })
  })

  describe('DELETE /categories/:id', () => {
    test('should return a 200 code and an object', async () => {
      const response = await request(app).delete('/api/categories/1')
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Object)
    })
  })
})

afterAll(async () => {
  await sequelize.close()
  server.close()
})
