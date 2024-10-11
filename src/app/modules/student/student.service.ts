import httpStatus from 'http-status'
import { Student } from './student.model'
import AppError from '../../errors/appError'
import mongoose from 'mongoose'
import User from '../user/user.model'

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
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    if (await Student.doesUserExists(id)) {
      throw new AppError(httpStatus.NOT_FOUND, 'id does not exists')
    }

    // first transaction
    const studentDelete = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )
    if (!studentDelete) {
      throw new AppError(httpStatus.BAD_REQUEST, 'student not deleted')
    }

    // second transaction
    const userDelete = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )
    if (!userDelete) {
      throw new AppError(httpStatus.BAD_REQUEST, 'user not deleted')
    }
    await session.commitTransaction()
    await session.endSession()
    return studentDelete
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
  }
}

export const StudentService = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
}
