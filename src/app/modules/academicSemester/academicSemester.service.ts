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
    throw new Error('academic semester does not exists')
  }
  const result = await AcademicSemester.findOne({ _id })
  return result
}
const updateAcademicSemesterIntoDB = async (id: string) => {
  const result = await AcademicSemester.updateOne({ id })
  return result
}
export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersIntoDB,
  getSingleAcademicSemesterIntoDB,
  updateAcademicSemesterIntoDB,
}
