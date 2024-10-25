import { Router } from 'express'
import { courseController } from './course.controller'
import validRequest from '../../middleware/validateRequest'
import { CourseValidations } from './course.validation'

const router = Router()

router.post(
  '/create-course',
  validRequest(CourseValidations.createCourseValidationSchema),
  courseController.createCourse,
)
router.get('/', courseController.getAllCourse)
router.get('/:id', courseController.getSingleCourse)
router.delete('/:id', courseController.deleteCourse)

export const CourseRoutes = router
