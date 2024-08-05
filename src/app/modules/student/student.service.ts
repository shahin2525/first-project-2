import { Student } from './student.interface'
import { StudentModel } from './student.model'

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student)
  return result
}
// get all student
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()
  return result
}
// get single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
  return result
}

export const StudentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
}
