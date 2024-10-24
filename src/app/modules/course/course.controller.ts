import { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { CourseServices } from './course.service'
import catchAsync from '../../utils/catchAsync'

const createCourse: RequestHandler = catchAsync(async (req, res) => {
  const { data } = req.body
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

export const courseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
}
