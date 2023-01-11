import Koa from 'koa'

export const tokenController: Koa.Middleware = (ctx) => {
  if (ctx.request.header['content-type'] !== 'application/json') {
    return ctx.throw(400, 'Invalid content-type')
  }
  if (typeof ctx.request.body !== 'object') {
    return ctx.throw(400, 'Invalid parameter')
  }
  console.log(ctx.request.body)
}
