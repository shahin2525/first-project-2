import express from 'express'
import { AcademicSemesterControllers } from './academicSemester.controllers'
const router = express.Router()
router.post(
  '/create-academic-semester',
  AcademicSemesterControllers.createAcademicSemester,
)

export const AcademicSemesterRoute = router
