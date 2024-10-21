import { Schema, model } from 'mongoose'
import { AdminModel, TAdmin } from './admin.interface'

const AdminNameSchema = {
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
}
const GenderSchema = {
  type: String,
  enum: ['male', 'female', 'others'],
  required: true,
}
const BloodGroupSchema = {
  type: String,
  enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
}

const adminSchema = new Schema<TAdmin, AdminModel>({
  id: { type: String, required: true, unique: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  designation: { type: String, required: true },
  name: AdminNameSchema,
  email: { type: String, required: true, unique: true },
  gender: GenderSchema,
  dateOfBirth: { type: Date },
  contactNumber: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  bloodGroup: BloodGroupSchema,
  profileImg: { type: String },
  isDeleted: { type: Boolean, default: false },
})

// Static method to check if the user exists
adminSchema.statics.isUserExists = async function (
  id: string,
): Promise<TAdmin | null> {
  const isUserExists = await Admin.findOne({ id })

  return isUserExists
}

// Static method to check if the user does not exist
adminSchema.statics.userDoesNotExists = async function (id: string) {
  const doesUserExists = await Admin.findOne({ id })

  return !doesUserExists
}

const Admin = model<TAdmin, AdminModel>('Admin', adminSchema)

export default Admin
