import { NextFunction, Response, Request } from 'express'
import { createMan } from '../services/men.service'
import { CreatePersonInput } from '../schema/person.schema'

export const createManHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: CreatePersonInput = req.body

    const man = await createMan(body)

    res.status(200).json({
      message: 'Success',
      man,
    })
  } catch (e) {
    next(e)
  }
}
