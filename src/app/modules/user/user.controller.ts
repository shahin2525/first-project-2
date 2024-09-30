/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { UserServices } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { password, studentData } = req.body
    // const userValidation = userValidationSchema.parse(userData)
    const result = await UserServices.createUserIntoDB(password, studentData)
    res.status(201).json({
      success: true,
      message: 'student created successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'something went wrong' || err.message,
      error: err,
    })
  }
}

export const UserControllers = {
  createUser,
}
