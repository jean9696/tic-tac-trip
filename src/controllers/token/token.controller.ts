import { authDriver } from '#@/driver/auth'
import { ServiceError } from '#@/utils/errors'
import Koa from 'koa'

export const tokenController: Koa.Middleware = (ctx) => {
  if (ctx.request.header['content-type'] !== 'application/json') {
    throw new ServiceError(400, 'Invalid content-type')
  }
  const requestBody = ctx.request.body as { email?: string } | any
  if (
    typeof requestBody !== 'object' ||
    typeof requestBody?.email !== 'string' ||
    !requestBody.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
  ) {
    throw new ServiceError(400, 'Invalid parameter')
  }
  authDriver.addUser(requestBody.email)
  ctx.body = {
    token: authDriver.getToken(requestBody.email),
  }
}
