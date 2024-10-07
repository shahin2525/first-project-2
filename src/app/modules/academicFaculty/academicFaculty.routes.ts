import { Router } from 'express'
import validRequest from '../../middleware/validateRequest'
import { AcademicFacultyControllers } from './academicFaculty.controllers'
import { AcademicFacultyValidations } from './academicFaculty.Validation'

const router = Router()

router.post(
  '/create-academic-faculty',
  validRequest(
    AcademicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
)

export const AcademicFacultyRoutes = router
