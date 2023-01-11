import Koa from 'koa'

export const authMiddleware: Koa.Middleware = (_, next) => {
  return next()
}
