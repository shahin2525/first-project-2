/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'

const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500
  const message = error.message || 'something went wrong'
  res.status(statusCode).json({
    success: false,
    message,
    error,
  })
}
export default globalErrorHandler
