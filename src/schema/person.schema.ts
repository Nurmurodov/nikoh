import { string, object, z, TypeOf } from 'zod'
import { Gender } from '../enums/Gender'

export const createPersonSchema = object({
  body: object({
    first_name: string({
      required_error: 'Ism majburiy',
    }),
    last_name: string({
      required_error: 'Familiya majburiy',
    }),
    father_name: string({
      required_error: 'Otasining ismi majburiy',
    }),
    address: string().nullable().default(null),
    phone: string({
      required_error: 'Telefon kiritilmagan!',
    }).length(13, 'Telefon raqami xato'),
    date_birth: string({
      required_error: "Tug'ilgan kun kiritilmagan!",
    }).length(10, 'Sana xato kiritilgan'),
    passport: string({
      required_error: 'Passport majburiy',
    }).length(9, 'Passport xato kiritilgan'),
    gender: z.optional(z.nativeEnum(Gender)),
  }),
})

export const editPersonSchema = object({
  body: object({
    first_name: string().nullable().default(null),
    last_name: string().nullable().default(null),
    father_name: string().nullable().default(null),
    address: string().nullable().default(null),
    phone: string().length(13, 'Telefon raqami xato').nullable().default(null),
    date_birth: string()
      .length(10, 'Sana xato kiritilgan')
      .nullable()
      .default(null),
    passport: string()
      .length(9, 'Passport xato kiritilgan')
      .nullable()
      .default(null),
    gender: z.optional(z.nativeEnum(Gender)).nullable().default(null),
  }),
})

export type CreatePersonInput = TypeOf<typeof createPersonSchema>['body']
export type EditPersonInput = TypeOf<typeof editPersonSchema>['body']
