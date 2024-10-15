/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export type TAcademicDepartment = {
  name: string
  academicFaculty: Types.ObjectId
}

export interface AcademicDepartmentModel extends Model<TAcademicDepartment> {
  doesUserExists(id: string): Promise<TAcademicDepartment | null>
}
