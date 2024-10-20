import express from 'express'

import validRequest from '../../middleware/validateRequest'
import { UserControllers } from './user.controller'
import { studentValidations } from '../student/student.zod.validation'
import { FacultyValidations } from '../faculty/faculty.validation'

const router = express.Router()

router.post(
  '/create-student',
  validRequest(studentValidations.createStudentZodValidationSchema),

  UserControllers.createUser,
)

router.post(
  '/create-faculty',
  validRequest(FacultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
)

export const UserRouter = router
