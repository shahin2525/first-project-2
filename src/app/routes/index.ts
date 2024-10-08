import { Router } from 'express'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes'
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route'
import { StudentRoute } from '../modules/student/student.route'
import { UserRouter } from '../modules/user/user.route'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes'

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
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
]
routesModule.forEach((route) => router.use(route.path, route.route))

export default router
