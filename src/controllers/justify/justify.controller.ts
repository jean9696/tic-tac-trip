import Koa from 'koa'

export const justifyController: Koa.Middleware = (ctx) => {
  console.log(ctx.request)
  ctx.body = 'Hello World'
}
