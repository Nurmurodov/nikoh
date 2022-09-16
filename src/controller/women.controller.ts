import { NextFunction, Response, Request } from 'express'
import { CreatePersonInput, EditPersonInput } from '../schema/person.schema'
import AppError from '../utils/AppError'
import {
  createWoman,
  deleteWoman,
  findWomanById,
  getCountWomen,
  getWomen,
  getWomenForMarriage,
  updateWoman,
} from '../services/women.service'

export const createWomanHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: CreatePersonInput = req.body

    const woman = await createWoman(body)

    res.status(200).json({
      message: 'Success',
      woman,
    })
  } catch (e) {
    next(e)
  }
}

export const updateWomanHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const body: EditPersonInput = req.body

    const woman = await findWomanById(Number(id))

    if (!woman) {
      return next(new AppError(400, 'Ayol topilmadi!'))
    }

    const updatedWoman = await updateWoman(woman, body)

    res.status(200).json({
      message: 'Success',
      woman: updatedWoman,
    })
  } catch (e) {
    next(e)
  }
}

export const deleteWomanHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    await deleteWoman(Number(id))

    res.status(204).json({
      status: 'success',
    })
  } catch (e) {
    next(e)
  }
}

export const getWomanHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const woman = await findWomanById(Number(id))

    if (!woman) {
      return next(new AppError(400, 'Ayol topilmadi!'))
    }

    res.status(200).json({
      message: 'Success',
      woman,
    })
  } catch (e) {
    next(e)
  }
}

export const getWomenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search = '', page = 1, size = 10 } = req.query

    const women = await getWomen(Number(page), Number(size), String(search))

    const count = await getCountWomen(String(search))

    res.status(200).json({
      status: 'success',
      women,
      page: Number(page),
      size: Number(size),
      count,
    })
  } catch (e) {
    next(e)
  }
}

export const getWomenForMarriageHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search = '' } = req.query

    const women = await getWomenForMarriage(String(search))

    res.status(200).json({
      status: 'success',
      women,
    })
  } catch (e) {
    next(e)
  }
}
