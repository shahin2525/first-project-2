import { TAcademicFaculty } from './academicFaculty.interface'
import AcademicFaculty from './academicFaculty.model'

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload)
  return result
}

const getAllAcademicFacultyIntoDB = async () => {
  const result = await AcademicFaculty.find()
  return result
}

const getSingleAcademicFacultyIntoDB = async (id: string) => {
  const result = await AcademicFaculty.findOne({ _id: id })
  return result
}
const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
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
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyIntoDB,
  getSingleAcademicFacultyIntoDB,
  updateAcademicFacultyIntoDB,
}
