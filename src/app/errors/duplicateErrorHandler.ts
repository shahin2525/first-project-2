/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenerateError } from '../interface/error'

/* eslint-disable no-unused-vars */
const duplicateErrorHandler = (error: any): TGenerateError => {
  const match = error.errorResponse.errmsg.match(/"([^"]+)"/)
  const extractValue = match && match[1]

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractValue} is duplicate value`,
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
