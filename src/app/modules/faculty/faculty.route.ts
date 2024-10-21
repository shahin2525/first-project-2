import { Router } from 'express'
import { FacultyControllers } from './faculty.controller'

const router = Router()
router.get('/', FacultyControllers.getAllFaculty)
router.get('/:id', FacultyControllers.getSingleFaculty)
router.patch('/:id', FacultyControllers.updateFaculty)
router.delete('/:id', FacultyControllers.deleteFaculty)

export const FacultyRoutes = router
