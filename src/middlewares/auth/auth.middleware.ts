import { authDriver } from '#@/driver/auth'
import { ServiceError } from '#@/utils/errors'
import Koa from 'koa'

export const authMiddleware: Koa.Middleware = async (ctx, next) => {
  if (!ctx.request.token) {
    throw new ServiceError(401, 'Unauthorized')
  }
  try {
    ctx.user = await authDriver.getTokenUser(ctx.request.token)
  } catch (err) {
    throw new ServiceError(401, 'Unauthorized')
  }
  return next()
}
