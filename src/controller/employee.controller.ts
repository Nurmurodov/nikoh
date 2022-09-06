import { NextFunction, Response, Request } from 'express'
import { createEmployee } from '../services/employee.service'
import { CreateEmployeeInput } from '../schema/employee.schema'
import log from '../logger'

export const createEmployeeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: CreateEmployeeInput = req.body

    const employee = await createEmployee(body)

    res.status(200).json({
      status: 'success',
      employee,
    })
  } catch (err) {
    log.error(err)
    next(err)
  }
}
