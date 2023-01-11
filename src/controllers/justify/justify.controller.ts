import { justify } from '#@/lib/justify'
import Koa from 'koa'

export const justifyController: Koa.Middleware = (ctx) => {
  if (ctx.request.header['content-type'] !== 'text/plain') {
    return ctx.throw(400, 'Invalid content-type')
  }
  if (typeof ctx.request.body !== 'string') {
    return ctx.throw(400, 'Invalid parameter')
  }
  ctx.body = justify(ctx.request.body, 80)
}
