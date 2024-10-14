/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next: NextFunction,
) => {
  let statusCode = error.statusCode || 500
  let message = error.message || 'something went wrong'

  type TErrorSource = {
    path: number | string
    message: string
  }[]

  let errorSources: TErrorSource = {
    path: '',
    message: 'something went wrong',
  }

  const zodErrorHandler: TErrorSource = (error: ZodError) => {}

  if (error instanceof ZodError) {
    return {
      message: 'ami zod error',
    }
  }

  res.status(statusCode).json({
    success: false,
    message,
    // amiError: error,
    errorSources,
  })
}
export default globalErrorHandler
