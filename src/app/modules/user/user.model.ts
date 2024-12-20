import mongoose, { Schema } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import { hash } from 'bcrypt'
import config from '../../config'
// import AppError from '../../errors/appError'
// import httpStatus from 'http-status'

const UserSchema = new Schema<TUser, UserModel>(
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

// password hashing

UserSchema.pre('save', async function (next) {
  const hashedPassword = await hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  )
  this.password = hashedPassword

  next()
})

// empty password
UserSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})
//
// UserSchema.pre('findOneAndUpdate', async function (next) {
//   const query = this.getQuery()
//   const user = await User.findOne(query)
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'id not found')
//   }
//   next()
// })
//
// UserSchema.statics.doesUserExists = async function (id: string) {
//   const isUserExists = await User.findOne({ id })
//   return !isUserExists
// }

UserSchema.statics.doesUserExists = async function (id: string) {
  const doesUserExists = await User.findOne({ id })
  return !doesUserExists
}

const User = mongoose.model<TUser, UserModel>('User', UserSchema)

export default User
