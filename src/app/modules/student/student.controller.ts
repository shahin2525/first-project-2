import { Request, Response } from 'express'
import { StudentService } from './student.service'
import studentJoyValidationSchema from './student.joy.validation'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body
    const { error } = studentJoyValidationSchema.validate(studentData)
    const result = await StudentService.createStudentIntoDB(studentData)
    console.log(error)

    if (error) {
      res.status(500).json({
        success: false,
        message: 'something went wrong joy',
        error: error.details,
      })
    }

    res.status(200).json({
      success: true,
      message: 'create student successfully',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong ',
      error: err,
    })
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
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error,
    })
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
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error,
    })
  }
}

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
}
