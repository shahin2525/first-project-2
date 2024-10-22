import { Router } from 'express'
import { FacultyControllers } from './faculty.controller'
import validRequest from '../../middleware/validateRequest'
import { FacultyValidations } from './faculty.validation'

const router = Router()
router.get('/', FacultyControllers.getAllFaculty)
router.get('/:id', FacultyControllers.getSingleFaculty)
router.patch(
  '/:id',
  validRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
)
router.delete('/:id', FacultyControllers.deleteFaculty)

export const FacultyRoutes = router
