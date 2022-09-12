import { NextFunction, Response, Request } from 'express'
import {
  changeStatusEmployee,
  createEmployee,
  deleteEmployee,
  editEmployee,
  getAllEmployee,
  getCountEmployees,
  getEmployeeById,
} from '../services/employee.service'
import { CreateEmployeeInput } from '../schema/employee.schema'
import AppError from '../utils/AppError'

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
  } catch (e) {
    next(e)
  }
}

export const deleteEmployeeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    await deleteEmployee(Number(id))

    res.status(204).json({
      status: 'success',
    })
  } catch (e) {
    next(e)
  }
}

export const editEmployeeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const employee = await getEmployeeById(Number(id))

    if (!employee) {
      return next(new AppError(400, 'Xodim topilmadi!'))
    }

    const editedEmployee = await editEmployee(employee, req.body)

    res.status(200).json({
      status: 'success',
      employee: editedEmployee,
    })
  } catch (e) {
    next(e)
  }
}

export const getAllEmployeeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search = '', page = 1, size = 10 } = req.query

    const employees = await getAllEmployee(
      Number(page),
      Number(size),
      String(search)
    )

    const count = await getCountEmployees()

    res.status(200).json({
      status: 'success',
      employees,
      page: Number(page),
      size: Number(size),
      count,
    })
  } catch (e) {
    next(e)
  }
}

export const changeStatusHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { is_active } = req.query

    const employee = await getEmployeeById(Number(id))

    if (!employee) {
      return next(new AppError(400, 'Xodim topilmadi!'))
    }

    const editedEmployee = await changeStatusEmployee(
      employee,
      is_active as any
    )

    res.status(200).json({
      status: 'success',
      employee: editedEmployee,
    })
  } catch (e) {
    next(e)
  }
}
