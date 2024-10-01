import { Router } from 'express'
import { StudentRoute } from '../modules/student/student.route'
import { UserRouter } from '../modules/user/user.route'

const router = Router()

const routesModule = [
  {
    path: '/students',
    route: StudentRoute,
  },
  {
    path: '/users',
    route: UserRouter,
  },
]
routesModule.forEach((route) => router.use(route.path, route.route))
//students/', StudentRoute
export default router
