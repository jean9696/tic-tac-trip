import { authDriver } from '#@/driver/auth/auth'

describe('auth', () => {
  it('should generate uniq tokens', () => {
    const email = 'test@test.fr'
    expect(authDriver.getToken(email)).not.toEqual(authDriver.getToken(email))
  })
})
