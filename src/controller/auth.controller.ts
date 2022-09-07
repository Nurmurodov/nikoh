import { NextFunction, Response, Request } from 'express'
import log from '../logger'
import {
  connectSessionToEmployee,
  findEmployeeByUsername,
  getEmployeeById,
} from '../services/employee.service'
import { Employee } from '../entities/Employee.entity'
import AppError from '../utils/AppError'
import {
  changeNumberSession,
  createAccessToken,
  createRefreshToken,
  sessionCreate,
} from '../services/session.service'
import { verifyJwt } from '../utils/jwt'

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
      return next(new AppError(400, 'Parol yoki login xato'))
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

export const refreshHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.cookies.refreshToken) {
      return next(new AppError(400, 'Token topilmadi'))
    }
    const refreshToken = req.cookies.refreshToken

    const decoded = verifyJwt<{ employee_id: number; session_number: number }>(
      refreshToken,
      'refreshTokenPrivateKey'
    )

    if (!decoded) {
      return next(new AppError(400, `Token eskirgan`))
    }

    const employee = await getEmployeeById(decoded.employee_id)

    if (!employee || !employee.session) {
      return next(new AppError(400, `Xodim topilmadi`))
    }

    if (employee.session.number !== decoded.session_number) {
      return next(new AppError(400, `Boshqa qurilmadan tizimga kirilgan`))
    }

    const session = await changeNumberSession(employee.session)

    const refreshTokenNew = await createRefreshToken(
      employee.id,
      session.number
    )

    const accessToken = await createAccessToken(employee.id)

    res.cookie('refreshToken', refreshTokenNew, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    })

    res.status(200).json({
      message: 'success',
      data: {
        accessToken,
        refreshToken: refreshTokenNew,
        employee: employee.toJSON(),
      },
    })
  } catch (e) {
    log.error(e)
    next(e)
  }
}
