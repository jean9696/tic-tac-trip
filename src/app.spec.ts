import { app } from './app'
import request from 'supertest'

describe('API', () => {
  it('should return 404 if route does not exist', async () => {
    await request(app.callback()).get('/api/does-not-exist').expect(404)
  })
})
