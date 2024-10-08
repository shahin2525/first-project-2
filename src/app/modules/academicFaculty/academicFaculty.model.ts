import { model, Schema } from 'mongoose'
import { TAcademicFaculty } from './academicFaculty.interface'

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
)

// 3. Create a Model.
const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
)
export default AcademicFaculty
