/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import { Student } from './student.model'
import AppError from '../../errors/appError'
import User from '../user/user.model'
import mongoose from 'mongoose'
import { TStudent } from './student.interface'
import QueryBuilder from '../../builder/QueryBuilder'
import { searchAbleFields } from './student.constants'
// import mongoose from 'mongoose'
// import User from '../user/user.model'

// const createStudentIntoDB = async (studentData: TStudent) => {
//   if (await Student.isUserExists(studentData.id)) {
//     throw new Error('user is already exists')
//   }

//   const result = await Student.create(studentData)

//   return result
// }
// get all student
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // let searchTerm = ''
  // // searchTerm
  // if (query?.searchTerm) {
  //   searchTerm = query.searchTerm as string
  // }

  // const searchQuery = Student.find({
  //   $or: searchAbleFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })
  // //filter
  // const queryObj = { ...query }
  // const excludesQuery = ['searchTerm', 'sort', 'limit', 'page', 'fields']
  // excludesQuery.forEach((el) => delete queryObj[el])

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   })
  // // sort
  // let sort = '-createdAt'
  // if (query?.sort) {
  //   sort = query.sort as string
  // }

  // const sortQuery = filterQuery.sort(sort)

  // let limit = 1
  // if (query?.limit) {
  //   limit = Number(query.limit)
  // }

  // let page = 1
  // let skip = 0
  // if (query?.page) {
  //   page = Number(query.page)
  //   skip = (page - 1) * limit
  // }

  // const pageQuery = sortQuery.skip(skip)
  // const limitQuery = pageQuery.limit(limit)
  // let fields = '-__v'
  // if (query?.fields) {
  //   fields = (query.fields as string).split(',').join(' ')
  // }
  // const fieldsQuery = await limitQuery.select(fields)
  // return fieldsQuery
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(searchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await studentQuery.queryModel
  return result
}
//

// get single student
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id })
  if (await Student.doesUserExists(id)) {
    throw new AppError(httpStatus.NOT_FOUND, 'user does not exists')
  }
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}
const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  // const result = await Student.findOne({ id })
  if (await Student.doesUserExists(id)) {
    throw new AppError(httpStatus.NOT_FOUND, 'user does not exists')
  }

  const { name, guardian, localGuardian, ...remainingStudent } = payload
  const modifiedData: Record<string, unknown> = { ...remainingStudent }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${key}`] = value
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedData[`localGuardian.${key}`] = value
    }
  }

  const result = await Student.findByIdAndUpdate({ id }, modifiedData, {
    new: true,
    runValidators: true,
  })

  return result
}
// delete single document
const deleteSingleStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession()
  if (await Student.doesUserExists(id)) {
    throw new AppError(httpStatus.NOT_FOUND, 'student id does not exists')
  }
  try {
    session.startTransaction()

    // first transaction
    const studentDelete = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    )
    if (!studentDelete) {
      throw new AppError(httpStatus.BAD_REQUEST, 'student not deleted')
    }

    // second transaction
    const studentId = studentDelete.user

    const userDelete = await User.findByIdAndUpdate(
      studentId,
      { isDeleted: true },
      { new: true, session },
    )
    if (!userDelete) {
      throw new AppError(httpStatus.BAD_REQUEST, 'user not deleted')
    }
    await session.commitTransaction()
    await session.endSession()
    return studentDelete
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

export const StudentService = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
  updateStudentFromDB,
}
