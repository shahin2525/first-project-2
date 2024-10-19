import { Types } from 'mongoose'

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
// export type TFacultyGuardian = {
//   fatherName: string
//   fatherContact: string
//   fatherOccupation: string
//   motherName: string
//   motherContact: string
//   motherOccupation: string
// }
// export type TFacultyLocalGuardian = {
//   name: string
//   contact: string
//   occupation: string
// }
export type TFaculty = {
  id: string
  user: Types.ObjectId
  designation: string
  name: TFacultyName
  email: string
  gender: TGender
  dateOfBirth?: string
  contactNumber: string
  emergencyContact: string

  presentAddress: string
  permanentAddress: string
  bloodGroup?: TBloodGroup

  profileImg?: string
  academicDepartment: Types.ObjectId

  isDeleted: boolean
}
