import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { academicSemesterNameCodeMapper } from './academicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'
import AcademicSemester from './academicSemester.model'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('invalid code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getAllAcademicSemestersIntoDB = async () => {
  const result = await AcademicSemester.find()
  return result
}
const getSingleAcademicSemesterIntoDB = async (_id: string) => {
  if (await AcademicSemester.isAcademicSemesterExists(_id)) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'academic semester does not exists',
    )
  }
  const result = await AcademicSemester.findOne({ _id })
  return result
}
const updateAcademicSemesterIntoDB = async (
  _id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (await AcademicSemester.isAcademicSemesterExists(_id)) {
    throw new Error('academic semester does not exists')
  }

  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('invalid code')
  }

  const result = await AcademicSemester.findOneAndUpdate(
    { _id: _id },
    { $set: payload },
    { returnDocument: 'after' },
  )
  return result
}
// const updateAcademicSemesterIntoDB = async (
//   id: string,
//   payload: Partial<TAcademicSemester>,
// ) => {
//   // if (await AcademicSemester.isAcademicSemesterExists(_id)) {
//   //   throw new Error('academic semester does not exists')
//   // }
//   const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
//     new: true,
//   })
//   return result
// }

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersIntoDB,
  getSingleAcademicSemesterIntoDB,
  updateAcademicSemesterIntoDB,
}
