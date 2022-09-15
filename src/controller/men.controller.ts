import { NextFunction, Response, Request } from 'express'
import {
  createMan,
  deleteMan,
  findManById,
  updateMan,
} from '../services/men.service'
import { CreatePersonInput, EditPersonInput } from '../schema/person.schema'
import AppError from '../utils/AppError'

export const createManHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: CreatePersonInput = req.body

    const man = await createMan(body)

    res.status(200).json({
      message: 'Success',
      man,
    })
  } catch (e) {
    next(e)
  }
}

export const updateManHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const body: EditPersonInput = req.body

    const man = await findManById(Number(id))

    if (!man) {
      return next(new AppError(400, 'Erkak topilmadi!'))
    }

    const updatedMan = await updateMan(man, body)

    res.status(200).json({
      message: 'Success',
      man: updatedMan,
    })
  } catch (e) {
    next(e)
  }
}

export const deleteManHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    await deleteMan(Number(id))

    res.status(204).json({
      status: 'success',
    })
  } catch (e) {
    next(e)
  }
}

export const getManHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const man = await findManById(Number(id))

    if (!man) {
      return next(new AppError(400, 'Erkak topilmadi!'))
    }

    res.status(200).json({
      message: 'Success',
      man,
    })
  } catch (e) {
    next(e)
  }
}
