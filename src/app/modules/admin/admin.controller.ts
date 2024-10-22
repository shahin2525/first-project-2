import { RequestHandler } from 'express'
import catchAsync from '../../utils/catchAsync'
import { AdminServices } from './admin.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const getAllAdmin: RequestHandler = catchAsync(async (req, res) => {
  const query = req.query
  const result = await AdminServices.getAllAdminIntoDB(query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all admin successfully',
    data: result,
  })
})
// get single admin
const getSingleAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AdminServices.getSingleAdminIntoDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single admin',
    data: result,
  })
})
// update admin
const updateAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const updateData = req.body
  const result = await AdminServices.updateAdminIntoDB(id, updateData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update admin successfully',
    data: result,
  })
})

// delete Admin
const deleteAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AdminServices.deleteAdminIntoDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin deleted successfully',
    data: result,
  })
})
export const AdminControllers = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
}
