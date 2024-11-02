import { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { CourseServices } from './course.service'
import catchAsync from '../../utils/catchAsync'

const createCourse: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body
  const result = await CourseServices.createCourseIntoDB(data)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course create successfully',
    data: result,
  })
})

const getAllCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseIntoDB(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all course successfully',
    data: result,
  })
})
const getSingleCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CourseServices.getSingleCourseIntoDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single course successfully',
    data: result,
  })
})
const updateCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = req.body
  const result = await CourseServices.updateCourseIntoDB(id, data)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update  course successfully',
    data: result,
  })
})
const deleteCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CourseServices.deleteCourseIntoDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'delete course successfully',
    data: result,
  })
})

// facultyWithCourse
const assignFacultyWithCourse: RequestHandler = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const { faculties } = req.body
  const result = await CourseServices.assignFacultyWithCourseIntoDB(
    courseId,
    faculties,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create faculty with  course successfully',
    data: result,
  })
})
// remove faculty from course
const removeFacultyFromCourse: RequestHandler = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const { faculties } = req.body
  const result = await CourseServices.removeFacultyWithCourseIntoDB(
    courseId,
    faculties,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'remove faculty from course successfully',
    data: result,
  })
})
export const courseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFacultyWithCourse,
  removeFacultyFromCourse,
}
