import { ParameterizedContext, Next } from 'koa'

import { config } from '../../config'
import { justify } from '../../lib/justify'

import { justifyController } from './justify.controller'

const DEFAULT_CTX = {
  request: {
    header: { 'content-type': 'text/plain' },
    body: 'Lorem ipsum dolor sit amet',
  },
  token: 'token',
} as unknown as ParameterizedContext
const NEXT = (() => {}) as Next
const cloneDeep = (obj: any) => JSON.parse(JSON.stringify(obj))

let ctx = cloneDeep(DEFAULT_CTX)
describe('justify controller', () => {
  beforeEach(() => {
    config.set('justify.rateLimitByDay', 80_000)
    ctx = cloneDeep(DEFAULT_CTX)
    jest.useFakeTimers()
  })
  it('should return justified text if valid parameters', () => {
    justifyController(ctx, NEXT)
    expect(ctx.body).toEqual(justify(ctx.request.body as string, 80))
  })
  it('shouldt hrow if invalid content type', () => {
    ctx.request.header['content-type'] = 'invalid'
    expect(() => justifyController(ctx, NEXT)).toThrow()
  })
  it('should throw if invalid body', () => {
    ctx.request.body = { invalid: 'body' }
    ctx.request.header['content-type'] = 'application/json'
    expect(() => justifyController(ctx, NEXT)).toThrow()
  })
  it('should not allow to pass more than allowed word for a given token', () => {
    config.set('justify.rateLimitByDay', 10)
    ctx.token = 'uniq-token'
    ctx.request.body = new Array(6).fill('word').join(' ')
    // OK
    expect(() => justifyController(ctx, NEXT)).not.toThrow()
    // Should throw
    expect(() => justifyController(ctx, NEXT)).toThrow()
  })
  it('should reset rate limitation if day has changed', () => {
    config.set('justify.rateLimitByDay', 10)
    ctx.token = 'uniq-token-time'
    ctx.request.body = new Array(6).fill('word').join(' ')
    expect(() => justifyController(ctx, NEXT)).not.toThrow()
    jest.setSystemTime(new Date('2020-01-02'))
    expect(() => justifyController(ctx, NEXT)).not.toThrow()
  })

  it('should allow to use different token without having rate limitation', () => {
    config.set('justify.rateLimitByDay', 10)
    ctx.token = 'uniq-token-1'
    ctx.request.body = new Array(6).fill('word').join(' ')
    expect(() => justifyController(ctx, NEXT)).not.toThrow()
    ctx.token = 'uniq-token-2'
    expect(() => justifyController(ctx, NEXT)).not.toThrow()
  })
})
