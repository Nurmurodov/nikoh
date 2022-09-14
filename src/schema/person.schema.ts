import { string, object, boolean, TypeOf } from 'zod'

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
  }),
})

export const editPersonSchema = object({
  body: object({
    full_name: string({
      required_error: 'F.I.O majburiy',
    })
      .nullable()
      .default(null),
    address: string().nullable().default(null),
    phone: string({
      required_error: 'Telefon kiritilmagan!',
    })
      .length(13, 'Telefon raqami xato')
      .nullable()
      .default(null),
    user_name: string({
      required_error: 'User name kiritilmagan',
    })
      .min(8, 'User name qisqa')
      .nullable()
      .default(null),
    date_birth: string({
      required_error: "Tug'ilgan kun kiritilmagan!",
    })
      .nullable()
      .default(null),
    is_active: boolean({
      required_error: "Activelik boolean bo'lishi kerak",
    })
      .nullable()
      .default(null),
  }),
})

export type EditPersonInput = TypeOf<typeof editPersonSchema>['body']

export type CreatePersonInput = Omit<
  TypeOf<typeof createPersonSchema>['body'],
  'passwordConfirm'
>
