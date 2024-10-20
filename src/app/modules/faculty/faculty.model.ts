import { Schema, model } from 'mongoose'
import { FacultyModel, TFaculty } from './faculty.interface'
// import { TFaculty, FacultyModel } from './types' // Assuming you're importing TFaculty and FacultyModel from a types file

// Define the schema for the TFacultyName type
const FacultyNameSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
})

// Define the schema for the TFaculty type
const FacultySchema = new Schema<TFaculty, FacultyModel>(
  {
    id: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    designation: { type: String, required: true },
    name: { type: FacultyNameSchema, required: true },
    email: { type: String, required: true, unique: true },
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
      required: true,
    },
    dateOfBirth: { type: Date },
    contactNumber: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    profileImg: { type: String },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: [true, 'academic department is required'],
    },
    isDeleted: { type: Boolean, default: false, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

// fullName
FacultySchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    ' ' +
    this?.name?.middleName +
    ' ' +
    this?.name?.lastName
  )
})

FacultySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
FacultySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

FacultySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

// Adding static method to the schema
FacultySchema.statics.isUserExists = async function (id: string) {
  const doesUserExists = await Faculty.findById(id)
  return doesUserExists
}

// Adding static method to the schema
FacultySchema.statics.userDoesNotExists = async function (id: string) {
  const doesUserExists = await Faculty.findById(id)
  return !doesUserExists
}

// Create the Faculty model
const Faculty = model<TFaculty, FacultyModel>('Faculty', FacultySchema)

export default Faculty
