import { Request, Response } from 'express'
import { StudentService } from './student.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body
    const result = await StudentService.createStudentIntoDB(studentData)
    res.status(200).json({
      success: true,
      message: 'create student successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}
// get all student
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentsFromDB()
    res.status(200).json({
      success: true,
      message: 'students retrieve successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}
// get single student
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentService.getSingleStudentFromDB(studentId)
    res.status(200).json({
      success: true,
      message: 'single student retrieve successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
}
