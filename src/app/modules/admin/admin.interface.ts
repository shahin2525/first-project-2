import { Model, Types } from 'mongoose'

//
export type TAdminName = {
  firstName: string
  middleName?: string
  lastName: string
}
export type TGender = 'male' | 'female' | 'others'
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-'

export type TAdmin = {
  id: string
  user: Types.ObjectId
  designation: string
  name: TAdminName
  email: string
  gender: TGender
  dateOfBirth?: Date
  contactNumber: string
  emergencyContact: string

  presentAddress: string
  permanentAddress: string
  bloodGroup?: TBloodGroup

  profileImg?: string

  isDeleted: boolean
}

export interface FacultyModel extends Model<TAdmin> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TAdmin | null>
  // eslint-disable-next-line no-unused-vars
  userDoesNotExists(id: string): Promise<TAdmin | null>
}
