import { model, Schema } from 'mongoose'
import { Student } from './student.interface'

// Define the UserName schema
const userNameSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
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
const studentSchema = new Schema<Student>({
  id: { type: String },

  name: userNameSchema,
  email: { type: String, required: true },
  gender: ['male', 'female'],
  dateOfBirth: { type: String },
  contactNumber: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: { type: String, required: true },
  isActive: ['active', 'inActive'],
})

export const StudentModel = model<Student>('Student', studentSchema)
