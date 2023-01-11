import { justifyController } from '#@/controllers/justify'
import { tokenController } from '#@/controllers/token'
import { authMiddleware } from '#@/middlewares/auth'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import KoaRouter from 'koa-router'

const PORT = process.env.PORT ?? 3000

export const app = new Koa()
const router = new KoaRouter({
  prefix: '/api',
})

router
  .post('/token', tokenController)
  .use(authMiddleware)
  .post('/justify', justifyController)

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .on('listening', () => {
    console.log(`Listening on port ${PORT}`) // eslint-disable-line no-console
  })

export const runServer = () => app.listen(PORT)

