import Koa from 'koa'
import KoaRouter from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { justifyController } from '#@/controllers/justify'
import { tokenController } from '#@/controllers/token'
import {authMiddleware} from '#@/middlewares/auth'

const PORT = process.env.PORT ?? 3000

const app = new Koa()
const router = new KoaRouter({
  prefix: '/api'
})

router
  .post('/token', tokenController)
  .use(authMiddleware)
  .post('/justify', justifyController)

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT).on('listening', () => {
    console.log(`Listening on port ${PORT}`)
})
