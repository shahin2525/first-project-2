/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction } from 'express'
import { ZodError } from 'zod'
import config from '../config'
import zodErrorHandler from '../errors/zodErrorHandler'
import { TErrorSources } from '../interface/error'

import validationErrorHandler from '../errors/validationErrorHandler'

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next: NextFunction,
) => {
  let statusCode = error.statusCode || 500
  let message = error.message || 'something went wrong'

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'something went wrong',
    },
  ]

  if (error instanceof ZodError) {
    const simplifiedError = zodErrorHandler(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = validationErrorHandler(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  }

  res.status(statusCode).json({
    success: false,
    message,
    // amiError: error,
    errorSources,
    stack: config.NODE_ENV === 'development' ? error.stack : null,
  })
}
export default globalErrorHandler
