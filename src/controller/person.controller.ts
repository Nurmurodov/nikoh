import { Request, Response, NextFunction } from 'express'
import log from '../logger'
import { CreatePersonInput } from '../schema/person.schema'
import {
  createPerson,
  deletePerson,
  editPerson,
  getAllPerson,
  getCountPerson,
  getPersonById,
} from '../services/person.service'
import AppError from '../utils/AppError'

export const createPersonHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: CreatePersonInput = req.body

    const person = await createPerson(body)

    res.status(200).json({
      status: 'success',
      person,
    })
  } catch (e) {
    log.error(e)
    next(e)
  }
}

export const editPersonHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const person = await getPersonById(Number(id))

    if (!person) {
      return next(new AppError(400, 'Inson topilmadi!'))
    }

    const editedPerson = await editPerson(person, req.body)

    res.status(200).json({
      status: 'success',
      employee: editedPerson,
    })
  } catch (e) {
    log.error(e)
    next(e)
  }
}

export const deletePersonHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    await deletePerson(Number(id))

    res.status(204).json({
      status: 'success',
    })
  } catch (e) {
    log.error(e)
    next(e)
  }
}

export const getAllPersonHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search = '', page = 1, size = 10 } = req.query

    const persons = await getAllPerson(
      Number(page),
      Number(size),
      String(search)
    )

    const count = await getCountPerson()

    res.status(200).json({
      status: 'success',
      persons,
      page: Number(page),
      size: Number(size),
      count,
    })
  } catch (err) {
    log.error(err)
    next(err)
  }
}
