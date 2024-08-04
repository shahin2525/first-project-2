import { Request, Response } from 'express'
import { StudentService } from './student.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body
    const result = await StudentService.createStudentIntoDB(student)
    res.status(200).json({
      success: true,
      message: 'student create successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

export const StudentController = {
  createStudent,
}
