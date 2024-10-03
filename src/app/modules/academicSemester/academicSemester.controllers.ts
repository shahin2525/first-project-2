import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  //   const { password, student: studentData } = req.body
  //   // const userValidation = userValidationSchema.parse(userData)
  //   const result = await UserServices.createUserIntoDB(password, studentData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student created successfully',
    data: result,
  })
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
}
