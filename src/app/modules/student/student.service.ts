import { Student } from './student.model'

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
  return result
}
// get single student
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id })
  const result = await Student.aggregate([
    {
      $match: { id: id },
    },
  ])
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
