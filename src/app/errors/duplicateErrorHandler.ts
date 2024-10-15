/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenerateError } from '../interface/error'

/* eslint-disable no-unused-vars */
const duplicateErrorHandler = (error: any): TGenerateError => {
  const errorSources: TErrorSources = [
    {
      path: '',
      message: error.errorResponse.errmsg,
    },
  ]
  const statusCode = 400
  return {
    statusCode,
    message: 'duplicate error',
    errorSources,
  }
}
export default duplicateErrorHandler
