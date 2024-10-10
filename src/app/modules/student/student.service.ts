import httpStatus from 'http-status'
import { Student } from './student.model'
import AppError from '../../errors/appError'

// const createStudentIntoDB = async (studentData: TStudent) => {
//   if (await Student.isUserExists(studentData.id)) {
//     throw new Error('user is already exists')
//   }

//   const result = await Student.create(studentData)

//   return result
// }
// get all student
const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}
//

// get single student
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id })
  if (await Student.doesUserExists(id)) {
    throw new AppError(httpStatus.NOT_FOUND, 'user does not exists')
  }
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}
// delete single document
const deleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.deleteOne({ id }, { isDeleted: true })
  return result
}

export const StudentService = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
}
