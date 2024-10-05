import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

const validRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      })
      next()
    } catch (error) {
      next(error)
    }
  }
}

export default validRequest
