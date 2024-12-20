import { model, Schema } from 'mongoose'
import {
  AcademicDepartmentModel,
  TAcademicDepartment,
} from './academicDepartment.interface'
import AppError from '../../errors/appError'
import httpStatus from 'http-status'

const academicDepartmentSchema = new Schema<
  TAcademicDepartment,
  AcademicDepartmentModel
>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
)

// academicDepartmentSchema.pre('save', async function (next) {
//   const isExists = await AcademicDepartment.findOne({
//     name: this.name,
//   })
//   if (isExists) {
//     throw new AppError(httpStatus.NOT_FOUND, 'name is already exists')
//   }
//   next()
// })

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()

  const isExists = await AcademicDepartment.findOne(query)
  if (!isExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'user does not exists')
  }
  next()
})

// get single department

academicDepartmentSchema.statics.doesUserExists = async function (id: string) {
  const isDepartmentExists = await AcademicDepartment.findOne({ id })
  return !isDepartmentExists
}

// 3. Create a Model.
const AcademicDepartment = model<TAcademicDepartment, AcademicDepartmentModel>(
  'AcademicDepartment',
  academicDepartmentSchema,
)
export default AcademicDepartment
