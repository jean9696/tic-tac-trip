import { justify } from '#@/lib/justify'
import { ServiceError } from '#@/utils/errors'
import Koa from 'koa'

import { justifyValidate } from './justify.validate'

export const justifyController: Koa.Middleware = (ctx) => {
  if (ctx.request.header['content-type'] !== 'text/plain') {
    throw new ServiceError(400, 'Invalid content-type')
  }
  if (typeof ctx.request.body !== 'string') {
    throw new ServiceError(400, 'Invalid parameter')
  }
  const requestWordsCount = ctx.request.body.split(/\s/g).length
  justifyValidate.validate(ctx.token, requestWordsCount)

  ctx.body = justify(ctx.request.body, 80)
}
