import { Model, Types } from 'mongoose'

//
export type TFacultyName = {
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

export type TFaculty = {
  id: string
  user: Types.ObjectId
  designation: string
  name: TFacultyName
  email: string
  gender: TGender
  dateOfBirth?: Date
  contactNumber: string
  emergencyContact: string

  presentAddress: string
  permanentAddress: string
  bloodGroup?: TBloodGroup

  profileImg?: string
  academicDepartment: Types.ObjectId

  isDeleted: boolean
}

export interface FacultyModel extends Model<TFaculty> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TFaculty | null>
  // eslint-disable-next-line no-unused-vars
  userDoesNotExists(id: string): Promise<TFaculty | null>
}
