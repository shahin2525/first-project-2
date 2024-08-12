import { Model } from 'mongoose'

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}
export type Guardian = {
  fatherName: string
  fatherContact: string
  fatherOccupation: string
  motherName: string
  motherContact: string
  motherOccupation: string
}
export type TLocalGuardian = {
  name: string
  contact: string
  occupation: string
}
export type TStudent = {
  id: string
  password: string
  name: TUserName
  email: string
  gender: 'male' | 'female'
  dateOfBirth?: string
  contactNumber: string
  emergencyContact: string

  presentAddress: string
  permanentAddress: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

  guardian: Guardian
  localGuardian: TLocalGuardian
  profileImg?: string
  isActive: 'active' | 'inActive'
  isDeleted: boolean
}
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>
}
// export interface StudentModel extends Model {
//   isUserExists(id: string): Promise<TStudent | null>
// }
