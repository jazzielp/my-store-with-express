const request = require('supertest')
const { app, server } = require('../index')
const sequelize = require('../lib/sequelize')
const { Product } = require('../db/models/product.model')

beforeAll(async () => {
  await sequelize.sync({ force: true })
  await Product.bulkCreate([
    {
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      image: 'image1.jpg',
      categoryId: 1
    },
    {
      name: 'Product 2',
      description: 'Description 2',
      price: 100,
      image: 'image1.jpg',
      categoryId: 2
    }
  ])
})

describe('TEST FOR PRODUCT ENDPOINTS', () => {
  describe('GET /products', () => {
    test('should return a 200 code, an array and two objects', async () => {
      const response = await request(app).get('/api/products')
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body).toHaveLength(2)
    })
  })

  describe('GET /products/:id', () => {
    test('should return a 200 code and an object', async () => {
      const response = await request(app).get('/api/products/1')
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Object)
    })
  })

  describe('POST /products', () => {
    test('should return a 201 code and an object', async () => {
      const response = await request(app)
        .post('/api/products')
        .send({
          name: 'Product 3',
          description: 'Description 3',
          price: 100,
          image: 'image3.jpg',
          categoryId: 1
        })
      expect(response.status).toBe(201)
      expect(response.body).toBeInstanceOf(Object)
    })
  })

  describe('PUT /products/:id', () => {
    test('should return a 200 code and an object', async () => {
      const response = await request(app)
        .put('/api/products/1')
        .send({
          name: 'Product 1 Updated',
          description: 'Description 1 Updated',
          price: 100,
          image: 'image1.jpg',
          categoryId: 1
        })
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Object)
    })
  })

  describe('DELETE /products/:id', () => {
    test('should return a 200 code and an object', async () => {
      const response = await request(app).delete('/api/products/1')
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Object)
    })
  })
})

afterAll(async () => {
  await sequelize.close()
  server.close()
})
