import { NextFunction, Response, Request } from 'express'
import log from '../logger'
import {
  connectSessionToEmployee,
  findEmployeeByUsername,
} from '../services/employee.service'
import { Employee } from '../entities/Employee.entity'
import AppError from '../utils/AppError'
import {
  changeNumberSession,
  createAccessToken,
  createRefreshToken,
  sessionCreate,
} from '../services/session.service'

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_name, password } = req.body

    const employee = await findEmployeeByUsername(user_name)

    if (
      !employee ||
      !(await Employee.comparePasswords(password, employee.password))
    ) {
      return next(new AppError(400, 'Invalid email or password'))
    }

    let numberSession = 1

    if (!employee.session) {
      const session = await sessionCreate()
      await connectSessionToEmployee(session, employee)
    } else {
      const session = await changeNumberSession(employee.session)
      numberSession = session.number
    }

    const refreshToken = await createRefreshToken(employee.id, numberSession)

    const accessToken = await createAccessToken(employee.id)

    res.cookie('refreshToken', refreshToken, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    })

    res.status(200).json({
      message: 'success',
      data: {
        accessToken,
        refreshToken,
        employee: employee.toJSON(),
      },
    })
  } catch (e) {
    log.error(e)
    next(e)
  }
}
