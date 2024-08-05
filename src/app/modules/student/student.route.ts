import express from 'express'
import { StudentController } from './student.controller'

const router = express.Router()
// create student
router.post('/create-student', StudentController.createStudent)
// get all student
router.get('/', StudentController.getAllStudents)
// get single student
router.get('/:studentId', StudentController.getSingleStudent)

export const StudentRoute = router
