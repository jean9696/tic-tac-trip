import { justify } from '#@/lib/justify'
import { ServiceError } from '#@/utils/errors'
import Koa from 'koa'

export const justifyController: Koa.Middleware = (ctx) => {
  if (ctx.request.header['content-type'] !== 'text/plain') {
    throw new ServiceError(400, 'Invalid content-type')
  }
  if (typeof ctx.request.body !== 'string') {
    throw new ServiceError(400, 'Invalid parameter')
  }
  ctx.body = justify(ctx.request.body, 80)
}
