import { TStudent } from '../student/student.interface'
import User from './user.model'

const createUserIntoDB = async (studentData: TStudent) => {
  const result = await User.create(studentData)
  return result
}
export const UserServices = {
  createUserIntoDB,
}
