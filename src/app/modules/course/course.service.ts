import QueryBuilder from '../../builder/QueryBuilder'
import { CourseSearchableFields } from './course.constants'
import { TCourse } from './course.interface'
import Course from './course.model'

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload)
  return result
}

const getAllCourseIntoDB = async (query: Record<string, unknown>) => {
  const courseBuilder = new QueryBuilder(Course.find(), query)
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
  const result = await courseBuilder.queryModel
  return result
}
const getSingleCourseIntoDB = async (id: string) => {
  const result = await Course.findById(id)
  return result
}

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const result = await Course.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  return result
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
