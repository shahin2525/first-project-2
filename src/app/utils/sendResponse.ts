import { Response } from 'express'

type responseData<T> = {
  statusCode: number
  success: boolean
  message: string
  data: T
}
const sendResponse = <T>(res: Response, data: responseData<T>) => {
  res.status(data?.statusCode).json({
    success: true,
    message: data.message,
    data: data.data,
  })
}
export default sendResponse
