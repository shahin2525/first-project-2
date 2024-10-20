import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/appError'
import { FacultySearchableFields } from './faculty.constant'

import Faculty from './faculty.model'
import { TFaculty } from './faculty.interface'

import User from '../user/user.model'
import mongoose from 'mongoose'

const getAllAcademicFacultyIntoDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await facultyQuery.queryModel
  return result
}

const getSingleFacultyIntoDB = async (id: string) => {
  if (await Faculty.userDoesNotExists(id)) {
    throw new AppError(httpStatus.NOT_FOUND, 'id does not exists')
  }
  const result = await Faculty.findById(id).populate('academicFaculty')
  return result
}
const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainFaculty } = payload

  const updateModifiedData: Record<string, unknown> = { ...remainFaculty }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      updateModifiedData[`name.${key}`] = value
    }
  }

  if (await Faculty.userDoesNotExists(id)) {
    throw new AppError(httpStatus.NOT_FOUND, 'id does not exists')
  }

  const result = await Faculty.findByIdAndUpdate(id, updateModifiedData, {
    new: true,
  })
  return result
}

const deleteFacultyIntoDB = async (id: string) => {
  if (await Faculty.userDoesNotExists(id)) {
    throw new AppError(httpStatus.NOT_FOUND, 'id does not exists')
  }
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const deleteFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    )
    if (!deleteFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete faculty')
    }

    const userId = deleteFaculty.user
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true },
    )
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete user')
    }
    await session.commitTransaction()
    await session.endSession()
    return deleteFacultyIntoDB
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}
export const FacultyServices = {
  getAllAcademicFacultyIntoDB,
  getSingleFacultyIntoDB,
  updateFacultyIntoDB,
  deleteFacultyIntoDB,
}
