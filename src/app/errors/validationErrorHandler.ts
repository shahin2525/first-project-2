import mongoose from 'mongoose'
import { TErrorSources } from '../interface/error'

const validationErrorHandler = (err: mongoose.Error.ValidationError) => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      }
    },
  )

  const statusCode = 400
  return {
    statusCode,
    message: 'validation error',
    errorSources,
  }
}

export default validationErrorHandler
