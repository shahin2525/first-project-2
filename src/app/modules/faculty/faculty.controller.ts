import { RequestHandler } from 'express'

import { FacultyServices } from './faculty.service'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const getAllFaculty: RequestHandler = catchAsync(async (req, res) => {
  const query = req.query
  const result = await FacultyServices.getAllAcademicFacultyIntoDB(query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all faculty',
    data: result,
  })
})
const getSingleFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await FacultyServices.getSingleFacultyIntoDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single faculty',
    data: result,
  })
})
const updateFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const { updateData } = req.body
  const result = await FacultyServices.updateFacultyIntoDB(id, updateData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update faculty successfully',
    data: result,
  })
})
// deleteFaculty
const deleteFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await FacultyServices.deleteFacultyIntoDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'delete faculty successfully',
    data: result,
  })
})

export const FacultyControllers = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
