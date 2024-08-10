import { TStudent } from './student.interface'
import { Student } from './student.model'

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('is is already exists')
  }

  const result = await Student.create(studentData)

  return result
}
// get all student
const getAllStudentsFromDB = async () => {
  const result = await Student.find()
  return result
}
// get single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
  return result
}

export const StudentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
}
