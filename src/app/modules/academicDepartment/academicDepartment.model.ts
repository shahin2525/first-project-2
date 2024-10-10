import { model, Schema } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
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

academicDepartmentSchema.pre('save', async function (next) {
  const isExists = await AcademicDepartment.findOne({
    name: this.name,
  })
  if (isExists) {
    throw new Error('name is already exists')
  }
  next()
})

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  console.log(query)

  const isExists = await AcademicDepartment.findOne(query)
  if (!isExists) {
    throw new Error('user does not exists')
  }
  next()
})

// 3. Create a Model.
const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
)
export default AcademicDepartment
