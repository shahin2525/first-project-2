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
router.patch(
  '/:id',
  validRequest(CourseValidations.updateCourseValidationSchema),
  courseController.updateCourse,
)
router.delete('/:id', courseController.deleteCourse)
router.put(
  '/:courseId/assign-faculties',
  validRequest(CourseValidations.facultiesWithCourseValidationSchema),
  courseController.assignFacultyWithCourse,
)
router.delete(
  '/:courseId/remove-faculties',
  validRequest(CourseValidations.facultiesWithCourseValidationSchema),
  courseController.removeFacultyFromCourse,
)

export const CourseRoutes = router
