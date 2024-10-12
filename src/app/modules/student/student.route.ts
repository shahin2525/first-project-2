import express from 'express'
import { StudentController } from './student.controller'
import validRequest from '../../middleware/validateRequest'
import { studentValidations } from './student.zod.validation'

const router = express.Router()
// create student
//router.post('/create-student', StudentController.createStudent)
// get all student
router.get('/', StudentController.getAllStudents)
// get single student
router.get('/:studentId', StudentController.getSingleStudent)
// update
router.patch(
  '/:studentId',
  validRequest(studentValidations.updateStudentZodValidationSchema),
  StudentController.UpdateSingleStudent,
)
// delete single student
router.delete('/:studentId', StudentController.deleteSingleStudent)

export const StudentRoute = router
