export type UserName = {
  firstName: string
  middleName: string
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
export type LocalGuardian = {
  name: string
  contact: string
  occupation: string
}
export type Student = {
  id: string
  name: UserName
  email: string
  gender: 'male' | 'female'
  dateOfBirth?: string
  contactNumber: string
  emergencyContact: string

  presentAddress: string
  permanentAddress: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

  guardian: Guardian
  localGuardian: LocalGuardian
  profileImg: string
  isActive: 'active' | 'blocked'
}
