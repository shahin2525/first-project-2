import { Router } from 'express'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes'
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route'
import { StudentRoute } from '../modules/student/student.route'
import { UserRouter } from '../modules/user/user.route'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes'
import { FacultyRoutes } from '../modules/faculty/faculty.route'
import { AdminRoutes } from '../modules/admin/admin.route'
import { CourseRoutes } from '../modules/course/course.route'

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
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
]
routesModule.forEach((route) => router.use(route.path, route.route))

export default router
