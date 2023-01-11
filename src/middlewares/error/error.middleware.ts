import { ServiceError } from '#@/utils/errors'
import Koa from 'koa'

export const errorMiddleware: Koa.Middleware = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if (error instanceof ServiceError) {
      ctx.status = error.code
      ctx.body = error.message
      return
    }
    if (error instanceof Error) {
      return ctx.throw(500, error.message)
    }
    throw error
  }
}
