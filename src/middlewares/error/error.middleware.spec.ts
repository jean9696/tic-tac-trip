import { cloneDeep } from '#@/utils/clone'
import { ServiceError } from '#@/utils/errors'
import { ParameterizedContext } from 'koa'

import { errorMiddleware } from './error.middleware'

const DEFAULT_CTX = {} as unknown as ParameterizedContext
let ctx = DEFAULT_CTX

describe('error middleware', () => {
  beforeEach(() => {
    ctx = cloneDeep(DEFAULT_CTX)
    // @ts-ignore
    ctx.throw = jest.fn(() => {})
  })
  it('should not throw if error is ServiceError', () => {
    expect(() =>
      errorMiddleware(ctx, async () => {
        throw new ServiceError(400, 'test')
      })
    ).not.toThrow()
  })
  it('should throw if error is not ServiceError', () => {
    errorMiddleware(ctx, () => {
      throw new Error('test')
    })
    expect(ctx.throw).toBeCalled()
  })
})
