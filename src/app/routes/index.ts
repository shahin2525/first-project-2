import { Router } from 'express'
import { StudentRoute } from '../modules/student/student.route'
import { UserRouter } from '../modules/user/user.route'
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route'

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
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoute,
  },
]
routesModule.forEach((route) => router.use(route.path, route.route))

export default router
