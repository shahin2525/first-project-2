import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { CourseSearchableFields } from './course.constants'
import { TCourse } from './course.interface'
import Course from './course.model'
import httpStatus from 'http-status'
import AppError from '../../errors/appError'

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload)
  return result
}

const getAllCourseIntoDB = async (query: Record<string, unknown>) => {
  const courseBuilder = new QueryBuilder(
    Course.find().populate('preRequisiteCourse.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
  const result = await courseBuilder.queryModel
  return result
}
const getSingleCourseIntoDB = async (id: string) => {
  const result = await Course.findById(id).populate('preRequisiteCourse.course')
  return result
}
// update course
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourse, ...remainingCourse } = payload

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // updateBasicCourseInfo
    const updateBasicCourse = await Course.findByIdAndUpdate(
      id,
      remainingCourse,
      {
        new: true,
        runValidators: true,
        session,
      },
    )
    if (!updateBasicCourse) {
      throw new AppError(httpStatus.BAD_REQUEST, 'fail to update basic course')
    }
    //

    // remove preRequisite and add new preRequisite
    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
      const deletePreRequisite = preRequisiteCourse
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course)

      const deletePreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourse: { course: { $in: deletePreRequisite } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      )

      if (!deletePreRequisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'fail to delete preRequisite course',
        )
      }

      // add new preRequisite
      const newPreRequisite = preRequisiteCourse.filter(
        (el) => el.course && !el.isDeleted,
      )
      const addNewPreRequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourse: { $each: newPreRequisite } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      )

      if (!addNewPreRequisiteCourse) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'fail to add new preRequisite course',
        )
      }
    }

    //

    session.commitTransaction()
    session.endSession()
    const result = await Course.findById(id).populate(
      'preRequisiteCourse.course',
    )
    return result
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    session.abortTransaction()
    session.endSession()
    throw new Error(err)
  }
}

// delete course
const deleteCourseIntoDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  )
  return result
}
export const CourseServices = {
  createCourseIntoDB,
  getAllCourseIntoDB,
  getSingleCourseIntoDB,
  updateCourseIntoDB,
  deleteCourseIntoDB,
}
