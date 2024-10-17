import { NextFunction, Request, Response } from 'express'
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status'
import { AnyZodObject, ZodError, ZodOptional } from 'zod'

import { APIErrorResponse } from '../shared'

function validationMiddleware(
  schema: AnyZodObject | ZodOptional<AnyZodObject>,
) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const message = 'An error occurred when validating user input schemas'
        const context = error.errors.map((issue) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        const response: APIErrorResponse = {
          message: message,
          details: { context: context, cause: error },
          isOperational: true,
        }
        res.status(BAD_REQUEST).json(response)
        return
      }

      if (error instanceof Error) {
        const message = 'An error occurred when validating user inputs'
        const response: APIErrorResponse = {
          message: message,
          details: { context: 'unknown', cause: error },
          isOperational: true,
        }
        res.status(INTERNAL_SERVER_ERROR).json(response)
        return
      }
    }
  }
}

export { validationMiddleware }
