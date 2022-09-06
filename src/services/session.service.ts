import { AppDataSource } from '../db'
import { Session } from '../entities/Session.entity'

const sessionRepository = AppDataSource.getRepository(Session)

export const sessionCreate = async () => {
  try {
    const session = sessionRepository.create({
      number: 1,
    })

    await sessionRepository.save(session)

    return session
  } catch (e) {
    throw new Error(e.message)
  }
}

export const changeNumberSession = async (session: Session) => {
  try {
    session.number = session.number + 1
    await session.save()
    return session
  } catch (e) {
    throw new Error(e.message)
  }
}
