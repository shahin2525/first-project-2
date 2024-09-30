export type TUser = {
  id: string
  password: string
  needPasswordChange?: boolean
  role: 'student' | 'admin' | 'faculty'
  status: 'in-progress' | 'blocked'
  isDeleted?: boolean
}
