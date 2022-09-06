import { NextFunction, Response, Request, CookieOptions } from 'express'
import config from 'config'
import log from '../logger'
import {
  connectSessionToEmployee,
  findEmployeeByUsername,
} from '../services/employee.service'
import { Employee } from '../entities/Employee.entity'
import AppError from '../utils/AppError'
import { changeNumberSession, sessionCreate } from '../services/session.service'

const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
}

if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true

const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
}

const refreshTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + config.get<number>('refreshTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('refreshTokenExpiresIn') * 60 * 1000,
}

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

    log.info(numberSession.toString())

    res.status(200).json({
      message: 'success',
    })
  } catch (e) {
    log.error(e)
    next(e)
  }
}
