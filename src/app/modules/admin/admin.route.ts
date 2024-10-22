import { Router } from 'express'
import { AdminControllers } from './admin.controller'

const router = Router()
router.get('/', AdminControllers.getAllAdmin)
router.get('/:id', AdminControllers.getSingleAdmin)
router.patch('/:id', AdminControllers.updateAdmin)
router.delete('/:id', AdminControllers.deleteAdmin)
export const AdminRoutes = router
