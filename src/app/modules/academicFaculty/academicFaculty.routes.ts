import express from 'express'
import validRequest from '../../middleware/validateRequest'
import { AcademicFacultyControllers } from './academicFaculty.controllers'
import { AcademicFacultyValidations } from './academicFaculty.Validation'

const router = express.Router()

router.post(
  '/create-academic-faculty',
  validRequest(
    AcademicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
)
router.get('/', AcademicFacultyControllers.getAllAcademicFaculty)
router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty)

// router.get('/:studentId', StudentController.getSingleStudent)

router.patch(
  '/:facultyId',
  validRequest(
    AcademicFacultyValidations.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
)

export const AcademicFacultyRoutes = router
