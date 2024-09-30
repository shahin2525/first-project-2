import mongoose, { Schema } from 'mongoose'
import { TUser } from './user.interface'

const UserSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needPasswordChange: { type: Boolean, default: true },
    role: {
      type: String,
      required: true,
      enum: ['student', 'admin', 'faculty'],
    },
    status: {
      type: String,
      required: true,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const User = mongoose.model<TUser>('User', UserSchema)

export default User
