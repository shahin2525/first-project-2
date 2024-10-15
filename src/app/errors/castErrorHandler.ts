import mongoose from 'mongoose'
import { TErrorSources, TGenerateError } from '../interface/error'

const castErrorHandler = (error: mongoose.Error.CastError): TGenerateError => {
  const errorSources: TErrorSources = [
    {
      path: error.path,
      message: error.message,
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: 'castError',
    errorSources,
  }
}

export default castErrorHandler
