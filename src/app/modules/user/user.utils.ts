import { TAcademicSemester } from '../academicSemester/academicSemester.interface'

export const generateStudentId = (payload: TAcademicSemester) => {
  let incrementId = (Number((0).toString()) + 1).toString().padStart(4, '0')
  incrementId = `${payload.year}${payload.code}${incrementId}`

  return incrementId
}
