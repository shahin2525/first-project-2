import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicSemesterServices } from './academicSemester.service'

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester created successfully',
    data: result,
  })
})
const getAllAcademicSemesters: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersIntoDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all academic-semester successfully',
    data: result,
  })
})
const getSingleAcademicSemesters: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.id
    const result =
      await AcademicSemesterServices.getSingleAcademicSemesterIntoDB(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'get single academic-semester successfully',
      data: result,
    })
  },
)

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemesters,
}
