import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { StudentService } from './student.service'
// import studentZodValidationSchema from './student.zod.validation'

// import studentJoyValidationSchema from './student.joy.validation'

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student: studentData } = req.body
//     // const { error } = studentJoyValidationSchema.validate(studentData)

//     const zodValidationData = studentZodValidationSchema.parse(studentData)

//     const result = await StudentService.createStudentIntoDB(zodValidationData)

//     res.status(200).json({
//       success: true,
//       message: 'create student successfully',
//       data: result,
//     })
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'something went wrong ',
//       error: err,
//     })
//   }
// }
// get all student
const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudentsFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'students retrieve successfully',
    data: result,
  })
})
// get single student
const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const result = await StudentService.getSingleStudentFromDB(studentId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single student retrieve successfully',
    data: result,
  })
})

const deleteSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const result = await StudentService.deleteSingleStudentFromDB(studentId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single student deleted successfully',
    data: result,
  })
})

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
}
