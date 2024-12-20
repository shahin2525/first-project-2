import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { TAcademicDepartment } from './academicDepartment.interface'
import AcademicDepartment from './academicDepartment.model'

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload)
  return result
}

const getAllAcademicDepartmentIntoDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty')
  return result
}

const getSingleAcademicDepartmentIntoDB = async (id: string) => {
  if (await AcademicDepartment.doesUserExists(id)) {
    throw new AppError(httpStatus.NOT_FOUND, 'user does not exists')
  }

  const result = await AcademicDepartment.findOne({ _id: id }).populate(
    'academicFaculty',
  )
  return result
}
const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    {
      _id: id,
    },
    payload,
    { new: true },
  )
  return result
  // const result = await AcademicFaculty.updateOne(
  //   // {
  //   //   _id: id,
  //   // },
  //   // payload,
  //   // {
  //   //   new: true,
  //   //   runValidators: true,
  //   // },
  //   { _id: id },
  //   { $set: payload },
  //   { returnDocument: 'after' },
  // )
  //   const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
  //     new: true,
  //   })
  //   return result
}

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentIntoDB,
  getSingleAcademicDepartmentIntoDB,
  updateAcademicDepartmentIntoDB,
}
