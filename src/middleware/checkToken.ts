import { NextFunction, Request, Response } from 'express'
import AppError from '../utils/AppError'
import { verifyJwt } from '../utils/jwt'
import { getEmployeeById } from '../services/employee.service'
import { Employee } from '../entities/Employee.entity'

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let access_token

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token
    }

    if (!access_token) {
      return next(new AppError(401, "Siz ro'yxatdan o'tmagansiz"))
    }

    const decoded = verifyJwt<{ employee_id: number }>(
      access_token,
      'accessTokenPrivateKey'
    )

    if (!decoded) {
      return next(new AppError(401, `Token eskirgan`))
    }

    const employee = await getEmployeeById(decoded.employee_id)

    if (!employee) {
      return next(new AppError(403, 'Employee topilmadi'))
    }

    res.locals.employee = employee

    next()
  } catch (e) {
    next(e)
  }
}
