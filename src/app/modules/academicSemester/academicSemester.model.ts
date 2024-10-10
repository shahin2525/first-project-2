import { Schema, model } from 'mongoose'
import {
  AcademicSemesterModel,
  TAcademicSemester,
} from './academicSemester.interface'
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant'
import AppError from '../../errors/appError'
import httpStatus from 'http-status'

const academicSemesterSchema = new Schema<
  TAcademicSemester,
  AcademicSemesterModel
>(
  {
    name: {
      type: String,
      enum: AcademicSemesterName,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemesterCode,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  })
  if (isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'semester is already exists')
  }
  next()
})

academicSemesterSchema.statics.isAcademicSemesterExists = async function (
  _id: string,
) {
  const isExists = await AcademicSemester.findOne({ _id })
  return !isExists
}

const AcademicSemester = model<TAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema,
)

export default AcademicSemester
