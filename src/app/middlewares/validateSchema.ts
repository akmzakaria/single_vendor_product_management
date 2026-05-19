import { ZodObject } from 'zod'
import { NextFunction, Request, Response } from 'express'

export const validateSchema = (schema: ZodObject) => (req: any, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
    })
    next()
  } catch (error) {
    next(error)
  }
}
