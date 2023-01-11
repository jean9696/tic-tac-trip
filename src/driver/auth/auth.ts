// TODO: migrate this to use a shared system between servince instances like redix
import { config } from '#@/config'
import jwt from 'jsonwebtoken'

interface User {
  usedWords: number
  lastCallAt: Date
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
    this.#users.set(email, {
      usedWords: 0,
      lastCallAt: new Date(),
    })
  }

  getTokenUserEmail = (token: string) =>
    new Promise((resolve, reject) =>
      jwt.verify(token, config.get('auth.privateKey'), (err, decoded) => {
        if (err) {
          return reject(err)
        }
        return resolve(decoded)
      })
    )

  isAuthenticated = (token: string) => this.getTokenUserEmail(token)

  getToken = (email: string) => {
    return jwt.sign({ email }, config.get('auth.privateKey'))
  }
}

export const authDriver = new AuthDriver()
