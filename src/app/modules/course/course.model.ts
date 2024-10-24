import { model, Schema } from 'mongoose'
import { TCourse, TPreRequisiteCourses } from './course.interface'

// PreRequisiteCourses schema
const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  isDeleted: { type: Boolean, default: false },
})

// Course schema
const courseSchema = new Schema<TCourse>({
  title: { type: String, required: true, trim: true, unique: true },
  prefix: { type: String, required: true, trim: true },
  code: { type: Number, required: true, trim: true },
  credits: { type: Number, required: true, trim: true },
  preRequisiteCourse: [preRequisiteCoursesSchema],
})

const Course = model<TCourse>('Course', courseSchema)

export default Course
