import { Role } from '../enums/Role'
import { NextFunction, Request, Response } from 'express'
import { Employee } from '../entities/Employee.entity'

export const checkAccess =
  (role: Role[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee = res.locals.employee as Employee

      const includeRole = role.includes(employee.role as Role)

      if (!includeRole) {
        return res.status(403).json({
          message: 'ruxsat yoq',
        })
      }

      return next()
    } catch (e) {
      return next(e)
    }
  }
