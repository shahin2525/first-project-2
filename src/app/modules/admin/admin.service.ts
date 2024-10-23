import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/appError'

import { AdminSearchableFields } from './admin.constant'

import Admin from './admin.model'
import { TFaculty } from '../faculty/faculty.interface'
import mongoose from 'mongoose'
import User from '../user/user.model'

const getAllAdminIntoDB = async (query: Record<string, unknown>) => {
  const adminBuilder = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await adminBuilder.queryModel
  return result
}

const getSingleAdminIntoDB = async (id: string) => {
  if (await Admin.userDoesNotExists(id)) {
    throw new AppError(httpStatus.NOT_FOUND, 'faculty id does not found')
  }
  const result = await Admin.findById(id)
  return result
}
// delete faculty

const updateAdminIntoDB = async (id: string, payload: TFaculty) => {
  const { name, ...remainingAdmin } = payload

  const updateModifiedAdmin: Record<string, unknown> = { ...remainingAdmin }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      updateModifiedAdmin[`name.${key}`] = value
    }
  }

  const result = await Admin.findByIdAndUpdate(id, updateModifiedAdmin, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteAdminIntoDB = async (id: string) => {
  if (await Admin.userDoesNotExists(id)) {
    throw new AppError(httpStatus.NOT_FOUND, 'admin id not found')
  }

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const deleteAdmin = await Admin.findByIdAndUpdate(id, {
      isDeleted: true,
      new: true,
      session,
    })
    if (!deleteAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete admin')
    }
    const userId = deleteAdmin.user
    const deleteUser = await User.findByIdAndUpdate(userId, {
      isDeleted: true,
      session,
    })
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete user')
    }
    await session.commitTransaction()
    await session.endSession()
    return deleteUser
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(error)
  }
}
export const AdminServices = {
  getAllAdminIntoDB,
  getSingleAdminIntoDB,
  updateAdminIntoDB,
  deleteAdminIntoDB,
}
