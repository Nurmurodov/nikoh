import config from 'config'

import { AppDataSource } from '../db'
import { Session } from '../entities/Session.entity'
import { signJwt } from '../utils/jwt'

const sessionRepository = AppDataSource.getRepository(Session)

export const sessionCreate = async () => {
  const session = sessionRepository.create({
    number: 1,
  })

  await sessionRepository.save(session)

  return session
}

export const changeNumberSession = async (session: Session) => {
  session.number = session.number + 1
  await session.save()
  return session
}

export const createRefreshToken = async (
  employee_id: number,
  session_number: number
) => {
  return signJwt({ employee_id, session_number }, 'refreshTokenPrivateKey', {
    expiresIn: config.get<string>('refreshTokenExpiresIn'),
  })
}

export const createAccessToken = async (employee_id: number) => {
  return signJwt({ employee_id }, 'accessTokenPrivateKey', {
    expiresIn: config.get<string>('accessTokenExpiresIn'),
  })
}
