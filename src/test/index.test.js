const supertest = require('supertest')
const { app, server } = require('../index')

describe('INDEX TEST', () => {
  describe('GET /', () => {
    test('Should return with text "Hello World"', async () => {
      const result = await supertest(app).get('/')
      expect(result.status).toBe(200)
      expect(result.text).toBe('Hello World!')
    })
  })
})

afterAll(() => {
  server.close()
})
