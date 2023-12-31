const request = require('supertest')
const bcrypt = require('bcrypt')

const { app, server } = require('../index')
const sequelize = require('../lib/sequelize')
const { User } = require('../db/models/user.model')
const { Category } = require('../db/models/category.model')
const { Product } = require('../db/models/product.model')

let hashPassword = ''
let token = null
bcrypt.hash('123456', 10)
  .then(hash => {
    hashPassword = hash
  })

beforeAll(async () => {
  await sequelize.sync({ force: true })
  await User.bulkCreate([
    {
      userName: 'castor',
      firstName: 'German',
      lastName: 'Castorena',
      email: 'castor@gmail.com',
      password: hashPassword,
      role: 'admin'
    },
    {
      userName: 'villega',
      firstName: 'Carlos',
      lastName: 'Villegas',
      email: 'villegas@gmail.com',
      password: hashPassword,
      role: 'basic'
    }
  ])

  await Category.bulkCreate([
    {
      name: 'Category 1'
    },
    {
      name: 'Category 2'
    }
  ])

  await Product.bulkCreate([
    {
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      image: 'image1.jpg',
      categoryId: 2
    },
    {
      name: 'Product 2',
      description: 'Description 2',
      price: 100,
      image: 'image1.jpg',
      categoryId: 2
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

describe('TEST FOR USER ENDPOINTS', () => {
  describe('GET /users', () => {
    test('should return a 200 code, an array and two objects', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body).toHaveLength(2)
    })

    test('should return a 401 code when the token is not sent', async () => {
      const response = await request(app).get('/api/users')
      expect(response.status).toBe(401)
      expect(response.text).toBe('Unauthorized')
    })
  })

  describe('GET /users/:id', () => {
    test('should return a 200 code, an object and a record', async () => {
      const response = await request(app)
        .get('/api/users/1')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('userName')
      expect(response.body).toHaveProperty('firstName')
      expect(response.body).toHaveProperty('lastName')
      expect(response.body).toHaveProperty('email')
      expect(response.body).toHaveProperty('role')
      expect(response.body.id).toBe(1)
    })

    test('Should return a 400 code when sending an id that is not an integer type', async () => {
      const response = await request(app)
        .get('/api/users/abc')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(400)
    })
  })

  describe('POST /users', () => {
    test('should return a 201 code and an object', async () => {
      const response = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          userName: 'test',
          firstName: 'test',
          lastName: 'test',
          email: 'soccer@gmail.com',
          password: hashPassword,
          role: 'basic'
        })
      expect(response.status).toBe(201)
      expect(response.body).toBeInstanceOf(Object)
    })
  })

  describe('PUT /users/:id', () => {
    test('should return a 200 code and an object', async () => {
      const response = await request(app)
        .put('/api/users/2')
        .set('Authorization', `Bearer ${token}`)
        .send({
          userName: 'testUpdate',
          firstName: 'testUpdate',
          lastName: 'testUpdate'
        })
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body.userName).toBe('testUpdate')
    })
  })

  describe('DELETE /users/:id', () => {
    test('should return a 204 code', async () => {
      const response = await request(app)
        .delete('/api/users/2')
        .set('Authorization', `Bearer ${token}`)
      expect(response.text).toBe('')
      expect(response.status).toBe(204)
    })
  })
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
      expect(response.status).toBe(201)
      expect(response.body).toBeInstanceOf(Object)
    })
  })

  describe('PUT /categories/:id', () => {
    test('should return a 200 code and an object', async () => {
      const response = await request(app)
        .put('/api/categories/1')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Category 1 Updated'
        })
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Object)
    })
  })

  describe('DELETE /categories/:id', () => {
    test('should return a 200 code and an object', async () => {
      const response = await request(app)
        .delete('/api/categories/1')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Object)
    })
  })
})

describe('TEST FOR PRODUCT ENDPOINTS', () => {
  describe('GET /products', () => {
    test('should return a 200 code, an array and two objects', async () => {
      const response = await request(app)
        .get('/api/products')
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Product 3',
          description: 'Description 3',
          price: 100,
          image: 'image3.jpg',
          categoryId: 2
        })
      expect(response.status).toBe(201)
      expect(response.body).toBeInstanceOf(Object)
    })
  })

  describe('PUT /products/:id', () => {
    test('should return a 200 code and an object', async () => {
      const response = await request(app)
        .put('/api/products/1')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Product 1 Updated',
          description: 'Description 1 Updated'
        })
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Object)
    })
  })

  describe('DELETE /products/:id', () => {
    test('should return a 200 code and an object', async () => {
      const response = await request(app)
        .delete('/api/products/1')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Object)
    })
  })
})

afterAll(async () => {
  await sequelize.close()
  server.close()
})
