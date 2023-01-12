// TODO: migrate this to use a shared system between service instances like redis
import { config } from '#@/config'
import jwt from 'jsonwebtoken'

interface User {
  lastJustifyCall?: Date
  usedJustifiedWords?: number
}

class AuthDriver {
  #users: Map<string, User>

  constructor() {
    this.#users = new Map()
  }

  addUser = (email: string) => {
    if (this.#users.has(email)) {
      return
    }
    this.#users.set(email, {})
  }

  getTokenUser = async (token: string) => {
    const email = await new Promise<string>((resolve, reject) =>
      jwt.verify(token, config.get('auth.privateKey'), (err, _decoded) => {
        const decoded = _decoded as { email?: string } | undefined
        if (err || !decoded?.email) {
          return reject(err)
        }
        return resolve(decoded.email)
      })
    )
    return {
      email,
      ...this.#users.get(email),
    }
  }

  getToken = (email: string) => {
    return jwt.sign(
      { email, createdAt: Date.now() },
      config.get('auth.privateKey')
    )
  }
}

export const authDriver = new AuthDriver()
