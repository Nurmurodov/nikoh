import { NextFunction, Request, Response } from 'express'
import { MarriageInput } from '../schema/marriage.schema'
import { findManById } from '../services/men.service'
import AppError from '../utils/AppError'
import { getWomanMarriageList } from '../services/women.service'
import { createMarriage } from '../services/marriage.service'
import { Employee } from '../entities/Employee.entity'

export const createMarriageHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: MarriageInput = req.body

    const man = await findManById(body.man_id)

    if (!man || man?.count_marriage >= 4) {
      return next(
        new AppError(
          400,
          'Erkak topilmadi yoki bu erkakga nikohlanish mumkin emas'
        )
      )
    }

    const woman = await getWomanMarriageList(body.woman_id)

    if (!woman) {
      return next(new AppError(400, 'Ayol topilmadi'))
    }

    woman.marriage.forEach((marriage) => {
      if (marriage.is_active) return next(new AppError(400, 'Ayol nikohlangan'))
    })

    if (woman.count_divorce === 3 && woman.last_married_man_id === body.man_id)
      return next(new AppError(400, 'Ayol bu erkakga nikohlana olmaydi'))

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
