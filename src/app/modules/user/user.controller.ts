import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body

  const result = await UserServices.createUserIntoDB(password, studentData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student created successfully',
    data: result,
  })
})

const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { password, faculty } = req.body
  const result = await UserServices.createFacultyIntoDB(password, faculty)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty created successfully',
    data: result,
  })

  return result
})

const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { password, admin } = req.body

  const result = await UserServices.createAdminIntoDB(password, admin)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin created successfully',
    data: result,
  })
})
export const UserControllers = {
  createUser,
  createFaculty,
  createAdmin,
}
