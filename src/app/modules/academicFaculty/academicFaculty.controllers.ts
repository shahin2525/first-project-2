import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicFacultyServices } from './academicFacultyService'

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic faculty created successfully',
    data: result,
  })
})

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultyIntoDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all academic faculty successfully',
    data: result,
  })
})

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params

  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyIntoDB(facultyId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single academic faculty successfully',
    data: result,
  })
})

// get single student
// const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
//   const { studentId } = req.params
//   const result = await StudentService.getSingleStudentFromDB(studentId)
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'single student retrieve successfully',
//     data: result,
//   })
// })

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params
  const data = req.body
  const result = await AcademicFacultyServices.updateAcademicFaculty(
    facultyId,
    data,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update academic faculty successfully',
    data: result,
  })
})

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
}
