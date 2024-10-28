import QueryBuilder from '../../builder/QueryBuilder'
import { CourseSearchableFields } from './course.constants'
import { TCourse } from './course.interface'
import Course from './course.model'

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

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourse, ...remainingCourse } = payload

  const updateBasicCourse = await Course.findByIdAndUpdate(
    id,
    remainingCourse,
    {
      new: true,
      runValidators: true,
    },
  )
  if (preRequisiteCourse && preRequisiteCourse.length > 0) {
    const deletePreRequisite = preRequisiteCourse
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course)

    const delPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
      $pull: { preRequisiteCourse: { course: { $in: deletePreRequisite } } },
    })
  }
  return updateBasicCourse
}
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
