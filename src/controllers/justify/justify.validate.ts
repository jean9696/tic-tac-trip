import { config } from '#@/config'
import { ServiceError } from '#@/utils/errors'
import dayjs from 'dayjs'

export class JustifyValidate {
  #lastCall: Date = new Date()
  #wordUsageByToken: Map<string, number>

  constructor() {
    this.#wordUsageByToken = new Map()
  }

  public validate(token: string, words: number) {
    if (dayjs(this.#lastCall).diff(dayjs(Date.now()), 'days') > 1) {
      this.#wordUsageByToken.clear()
    }
    const totalUsage = (this.#wordUsageByToken.get(token) ?? 0) + words
    if (totalUsage > config.get('justify.rateLimitByDay')) {
      throw new ServiceError(402, 'Payment Required')
    }
    this.#wordUsageByToken.set(token, totalUsage)
  }
}

export const justifyValidate = new JustifyValidate()
