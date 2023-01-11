import request from 'supertest'

import { app } from './app'

describe('API', () => {
  it('should return 404 if route does not exist', async () => {
    await request(app.callback()).get('/api/does-not-exist').expect(404)
  })
  describe('auth', () => {
    it('should return 401 if not authenticated', async () => {
      await request(app.callback()).post('/api/justify').expect(401)
    })
    it('should allow to retrieve token', async () => {
      await request(app.callback())
        .post('/api/token')
        .send({ email: 'tic@tac.trip' })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty('token')
        })
    })
    it('should allow to use token to use justify api', async () => {
      const token = await request(app.callback())
        .post('/api/token')
        .send({ email: 'tic@tac.trip' })
        .then((response) => response.body.token)
      await request(app.callback())
        .post('/api/justify')
        .set('content-type', 'text/plain')
        .send('test')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    })
  })
})
