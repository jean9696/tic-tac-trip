import { justifyController } from '#@/controllers/justify'
import { tokenController } from '#@/controllers/token'
import { authMiddleware } from '#@/middlewares/auth'
import { errorMiddleware } from '#@/middlewares/error'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import KoaRouter from 'koa-router'
import {config} from '#@/config'


const app = new Koa()
const router = new KoaRouter({
  prefix: '/api',
})

router
  .post('/token', tokenController)
  .use(authMiddleware)
  .post('/justify', justifyController)

app
  .use(
    bodyParser({
      enableTypes: ['json', 'text'],
    })
  )
  .use(errorMiddleware)
  .use(router.routes())
  .use(router.allowedMethods())

export { app }
export const runServer = () =>
  app
    .on('listening', () => {
      console.log(`Listening on port ${config.get('port')}`) // eslint-disable-line no-console
    })
    .listen(config.get('port'))
