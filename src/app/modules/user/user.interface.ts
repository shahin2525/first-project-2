/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'
import { TStudent } from '../student/student.interface'

export type TUser = {
  id: string
  password: string
  needPasswordChange?: boolean
  role: 'student' | 'admin' | 'faculty'
  status: 'in-progress' | 'blocked'
  isDeleted?: boolean
}

export interface UserModel extends Model<TUser> {
  doesUserExists(id: string): Promise<TUser | TStudent | null>
}
