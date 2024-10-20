import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/appError'
import { FacultySearchableFields } from './faculty.constant'

import Faculty from './faculty.model'
import { TFaculty } from './faculty.interface'

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
  if (await Faculty.userDoesNotExists(id)) {
    throw new AppError(httpStatus.NOT_FOUND, 'id does not exists')
  }

  const result = await Faculty.findByIdAndUpdate(id, payload, { new: true })
  return result
}

export const FacultyServices = {
  getAllAcademicFacultyIntoDB,
  getSingleFacultyIntoDB,
  updateFacultyIntoDB,
}
