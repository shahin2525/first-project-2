import { ZodError } from 'zod'
import { TErrorSources, TGenerateError } from '../interface/error'

const zodErrorHandler = (error: ZodError): TGenerateError => {
  const errorSources: TErrorSources = error.issues.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    }
  })
  const statusCode = 400
  return {
    statusCode,
    message: 'Zod validation error',
    errorSources,
  }
}

export default zodErrorHandler
