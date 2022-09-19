import { NextFunction, Request, Response } from 'express'
import { MarriageInput } from '../schema/marriage.schema'
import {
  cancelMarriageMan,
  findManById,
  newMarriageMan,
} from '../services/men.service'
import AppError from '../utils/AppError'
import {
  cancelMarriageWoman,
  getWomanMarriageList,
  newMarriageWoman,
} from '../services/women.service'
import {
  cancelMarriage,
  createMarriage,
  getMarriageById,
  getMarriagesList,
  getMarriagesListCount,
} from '../services/marriage.service'
import { Employee } from '../entities/Employee.entity'

export const createMarriageHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: MarriageInput = req.body

    let man = await findManById(body.man_id)

    if (!man || man?.count_marriage >= 4) {
      return next(
        new AppError(
          400,
          'Erkak topilmadi yoki bu erkakga nikohlanish mumkin emas'
        )
      )
    }

    let woman = await getWomanMarriageList(body.woman_id)

    if (!woman) {
      throw new Error('Ayol topilmadi')
    }

    woman.marriage.forEach((marriage) => {
      if (marriage.is_active) throw new Error('Ayol nikohlangan')
    })

    if (woman.count_divorce === 3 && woman.last_married_man_id === body.man_id)
      throw new Error('Ayol bu erkakga nikohlana olmaydi')

    man = await newMarriageMan(man)
    woman = await newMarriageWoman(woman, man.id)

    const marriage = await createMarriage(
      body,
      res.locals.employee as Employee,
      man,
      woman
    )

    res.status(200).json({
      message: 'Success',
      marriage,
    })
  } catch (e) {
    next(e)
  }
}

export const cancelMarriageHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { divorce_count = 1 } = req.query

    let marriage = await getMarriageById(Number(id))

    if (!marriage?.is_active) {
      throw new Error('Nikoh active emas')
    }

    await cancelMarriageMan(marriage.man)
    await cancelMarriageWoman(
      marriage.woman,
      marriage.man.id,
      Number(divorce_count)
    )

    marriage = await cancelMarriage(
      marriage,
      res.locals.employee as Employee,
      Number(divorce_count)
    )

    res.status(200).json({
      message: 'Success',
      marriage,
    })
  } catch (e) {
    next(e)
  }
}

export const getOneMarriageHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const marriage = await getMarriageById(Number(id))

    if (!marriage) {
      throw new Error('Nikoh topilmadi!')
    }

    res.status(200).json({
      message: 'Success',
      marriage,
    })
  } catch (e) {
    next(e)
  }
}

export const getMarriagesListHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { is_active, page = 1, size = 10 } = req.query

    const marriages = await getMarriagesList(
      Number(page),
      Number(size),
      String(is_active)
    )

    const count = await getMarriagesListCount(String(is_active))

    res.status(200).json({
      message: 'Success',
      marriages,
      page: Number(page),
      size: Number(size),
      count,
    })
  } catch (e) {
    next(e)
  }
}
