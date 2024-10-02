import express from 'express'

import validRequest from '../../middleware/validateRequest'
import { UserControllers } from './user.controller'
import { studentValidations } from '../student/student.zod.validation'
// import {createStudentZodValidationSchema } from '../student/student.zod.validation'

const router = express.Router()

router.post(
  '/create-student',
  validRequest(studentValidations.createStudentZodValidationSchema),

  UserControllers.createUser,
)

export const UserRouter = router
