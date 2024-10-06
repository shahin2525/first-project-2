import express from 'express'
import { AcademicSemesterControllers } from './academicSemester.controllers'
import validRequest from '../../middleware/validateRequest'
import { AcademicSemesterValidations } from './academicSemester.validation'
const router = express.Router()
router.post(
  '/create-academic-semester',

  validRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
)
router.get('/', AcademicSemesterControllers.getAllAcademicSemesters)
router.get('/:id', AcademicSemesterControllers.getSingleAcademicSemesters)

router.patch(
  '/:id',
  validRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
)
export const AcademicSemesterRoute = router
