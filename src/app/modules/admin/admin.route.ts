import { Router } from 'express'
import { AdminControllers } from './admin.controller'
import validRequest from '../../middleware/validateRequest'
import { AdminValidations } from './admin.validation'

const router = Router()
router.get('/', AdminControllers.getAllAdmin)
router.get('/:id', AdminControllers.getSingleAdmin)
router.patch(
  '/:id',
  validRequest(AdminValidations.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
)
router.delete('/:id', AdminControllers.deleteAdmin)
export const AdminRoutes = router
