import { Router } from 'express'
import { AcademicDepartmentControllers } from './academicDepartment.controller'
import validRequest from '../../middleware/validateRequest'
import { AcademicDepartmentValidations } from './academicDepartment.validation'

const router = Router()
router.post(
  '/create-academic-department',
  validRequest(
    AcademicDepartmentValidations.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
)
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment)
router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
)
router.patch(
  '/:departmentId',
  validRequest(
    AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
)

export const AcademicDepartmentRoutes = router
