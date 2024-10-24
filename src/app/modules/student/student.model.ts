import { model, Schema } from 'mongoose'
import { StudentModel, TStudent } from './student.interface'

const userNameSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'Must be max length 20, character'],
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, 'last name is required'],
  },
})

// Define the Guardian schema
const guardianSchema = new Schema({
  fatherName: { type: String, required: true },
  fatherContact: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContact: { type: String, required: true },
  motherOccupation: { type: String, required: true },
})

// Define the LocalGuardian schema
const localGuardianSchema = new Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  occupation: { type: String, required: true },
})

// Define the Student schema
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'user is required'],
      unique: true,
      ref: 'User',
    },

    name: userNameSchema,
    email: {
      type: String,
      required: [true, 'email is required'],

      unique: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    dateOfBirth: { type: String },
    contactNumber: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

// mongoose virtual

const virtual = studentSchema.virtual('fullName')
virtual.get(function () {
  return `${this.name?.firstName} ${this.name?.middleName} ${this.name?.lastName}`
})

// static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}
studentSchema.statics.doesUserExists = async function (id: string) {
  const doesUserExists = await Student.findOne({ id })
  return !doesUserExists
}

// studentSchema.pre('save', async function (next) {
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this

//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   )

//   next()
// })

// studentSchema.post('save', function (doc, next) {
//   doc.password = ''
//   next()
// })

// query middleware

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// studentSchema.pre('findOne', function (next) {
//   this.find({ isDeleted: { $ne: true } })
//   next()
// })

// aggregate middleware

// studentSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
//   next()
// })

// studentSchema.pre('findOne', async function (next) {
//   const query = this.getQuery()
//   const isExists = await Student.findOne({ query })
//   if (!isExists) {
//     throw new Error('user does not exists')
//   }
//   next()
// })

// studentSchema.pre('findOne', async function (next) {
//   const query = this.getQuery()
//   console.log(query)
//   const isExists = await Student.findOne(query)
//   if (!isExists) {
//     throw new Error('user does not exists')
//   }
//   next()
// })

export const Student = model<TStudent, StudentModel>('Student', studentSchema)
